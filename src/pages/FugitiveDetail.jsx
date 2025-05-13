import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import html2pdf from 'html2pdf.js';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon
} from 'react-share';
import {QRCodeSVG} from 'qrcode.react';

const FugitiveDetail = () => {
  const { id } = useParams();
  const [fugitive, setFugitive] = useState(null);
  const pdfRef = useRef();
  const currentUrl = `${window.location.origin}/details/${id}`;

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await axios.get(`https://api.fbi.gov/wanted/v1/list`);
      const person = res.data.items.find(item => item.uid === id);
      setFugitive(person);
    };
    fetchDetail();
  }, [id]);

  const downloadPDF = () => {
    if (!fugitive) return;
    html2pdf().from(pdfRef.current).save(`${fugitive.title}-FBI-Profile.pdf`);
  };

  if (!fugitive) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Link to="/" className="text-blue-600 mb-4 inline-block">&larr; Back to List</Link>

      <div ref={pdfRef} className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        {fugitive.images?.length > 1 ? (
          <Swiper spaceBetween={10} slidesPerView={1} className="rounded-xl mb-4">
            {fugitive.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img.original}
                  alt={`${fugitive.title} ${index + 1}`}
                  className="w-full max-h-[500px] object-contain rounded"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <img
            src={fugitive.images[0]?.original || 'https://via.placeholder.com/300'}
            alt={fugitive.title}
            className="w-full max-h-[500px] object-contain mb-4 rounded"
          />
        )}

        <h1 className="text-3xl font-bold text-red-700 mb-2">{fugitive.title}</h1>
        <p className="text-gray-700 mb-4">{fugitive.description}</p>

        <p><strong>Sex:</strong> {fugitive.sex || 'N/A'}</p>
        <p><strong>Nationality:</strong> {fugitive.nationality || 'N/A'}</p>
        <p><strong>Reward:</strong> {fugitive.reward_text || 'None'}</p>
        <p><strong>Aliases:</strong> {fugitive.aliases?.join(', ') || 'None'}</p>

        <div className="flex flex-wrap gap-4 mt-6">
          <a
            href={fugitive.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View on FBI.gov
          </a>

          <a
            href="https://tips.fbi.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Report a Tip →
          </a>

          <button
            onClick={downloadPDF}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Download as PDF
          </button>
        </div>

        {/* Social Share */}
        <div className="mt-8 text-center">
          <h2 className="text-lg font-semibold mb-2">Share this profile:</h2>
          <div className="flex gap-4 items-center justify-center">
            <FacebookShareButton url={currentUrl} quote={fugitive.title}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>

            <TwitterShareButton url={currentUrl} title={fugitive.title}>
              <TwitterIcon size={40} round />
            </TwitterShareButton>

            <WhatsappShareButton url={currentUrl} title={fugitive.title}>
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>
          </div>
        </div>

        {/* QR Code */}
        <div className="mt-8 text-center">
        <h2 className="text-lg font-semibold mb-2">Scan QR to view on mobile:</h2>

        <div id="qr-wrapper" className="inline-block">
            <QRCodeSVG
            id="fugitive-qr"
            value={fugitive.url}
            size={128}
            className="border p-2 bg-white"
            />
        </div>

        <div className="mt-4">
            <button
            onClick={() => {
                const svg = document.getElementById('fugitive-qr');
                const serializer = new XMLSerializer();
                const source = serializer.serializeToString(svg);
                const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
                const url = URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = url;
                link.download = `${fugitive.title.replace(/\s+/g, '-')}-QRCode.svg`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer">
            Download QR Code
            </button>
        </div>
        </div>

      </div>
    </div>
  );
};

export default FugitiveDetail;
