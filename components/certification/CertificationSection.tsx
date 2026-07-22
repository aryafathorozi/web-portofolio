"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { getAllCertifications } from "@/services/certificationService";
import { CertificationEntity } from "@/types/database.types";

// Kurva Bezier Kustom untuk transisi ekstra smooth
const smoothBezier = [0.22, 1, 0.36, 1] as const;

interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  imageSrc: string;
  badgeColor: string;
  link?: string;
}

const BADGE_COLORS = [
  "text-blue-400 ring-blue-500/30 bg-blue-500/10",
  "text-cyan-400 ring-cyan-500/30 bg-cyan-500/10",
  "text-amber-400 ring-amber-500/30 bg-amber-500/10",
  "text-red-400 ring-red-500/30 bg-red-500/10",
  "text-purple-400 ring-purple-500/30 bg-purple-500/10",
  "text-emerald-400 ring-emerald-500/30 bg-emerald-500/10",
];

export default function CertificationSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [certifications, setCertifications] = useState<CertificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const INITIAL_DISPLAY_COUNT = 3;

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const data = await getAllCertifications();
        const formattedData: CertificationItem[] = data.map((cert, index) => ({
          id: cert.id || index.toString(),
          title: cert.title,
          issuer: cert.company,
          year: cert.year,
          imageSrc: cert.image_src || "/images/cert-meta.jpg",
          badgeColor: BADGE_COLORS[index % BADGE_COLORS.length],
          link: cert.link,
        }));
        setCertifications(formattedData);
      } catch (error) {
        console.error("Failed to fetch certifications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  const primaryCertifications = certifications.slice(0, INITIAL_DISPLAY_COUNT);
  const secondaryCertifications = certifications.slice(INITIAL_DISPLAY_COUNT);

  return (
    <section id="certification" className="container mx-auto px-4 py-24 relative z-10">
      {/* HEADER SECTION */}
      <div className="mb-16 text-center">
        <span className="text-blue-500 font-mono text-xs tracking-widest uppercase block mb-2">05 / Certification</span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase text-white">
          Professional <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Certifications</span>
        </h2>
        <p className="text-gray-500 text-xs md:text-sm max-w-xl mx-auto mt-4 leading-relaxed">
          A collection of industry-recognized credentials validating technical expertise and commitment to continuous learning.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* BARIS UTAMA: Selalu Tampil (Menampilkan 3 Card Pertama) */}
        <div className="flex flex-wrap justify-center gap-6 p-1">
          {isLoading ? (
            <div className="w-full flex justify-center py-12">
              <div className="w-8 h-8 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
            </div>
          ) : (
            primaryCertifications.map((cert) => (
              <CertificationCard key={cert.id} cert={cert} />
            ))
          )}
        </div>

        {/* CONTAINER AKORDEON: Mengikuti Alur Struktur Modul Experience */}
        <div className="overflow-hidden">
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                key="accordion-content-cert"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.6, ease: smoothBezier },
                  opacity: { duration: 0.4, delay: 0.05 },
                }}
              >
                {/* Wrapper flex tambahan untuk baris sekunder */}
                <div className="flex flex-wrap justify-center gap-6 p-1 pt-6">
                  {secondaryCertifications.map((cert) => (
                    <motion.div
                      key={cert.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 15, opacity: 0 }}
                      transition={{ duration: 0.4, ease: smoothBezier }}
                      className="w-full md:w-[calc(33.333%-16px)] min-w-[300px]"
                    >
                      <CertificationCard cert={cert} isSecondary={true} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* BUTTON CONTROLLER: Desain & Style Meniru Persis Tombol Modul Experience */}
        {certifications.length > INITIAL_DISPLAY_COUNT && (
          <div className="mt-14 flex justify-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group inline-flex items-center gap-2 rounded-full bg-white/5 px-6 py-2.5 text-xs font-mono tracking-wider text-gray-300 ring-1 ring-white/10 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 hover:text-white hover:ring-cyan-500/30 transition-all duration-300 shadow-xl uppercase"
            >
              {isExpanded ? (
                <>
                  SHOW LESS <ChevronUp size={14} className="text-gray-400 group-hover:text-cyan-400 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </>
              ) : (
                <>
                  VIEW ALL CERTIFICATION ({certifications.length}){" "}
                  <ChevronDown size={14} className="text-gray-400 group-hover:text-cyan-400 group-hover:translate-y-0.5 transition-transform duration-300" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// Sub-Komponen Card untuk Menjaga Kebersihan Kode Utama
function CertificationCard({ cert, isSecondary = false }: { cert: CertificationItem; isSecondary?: boolean }) {
  const cardBody = (
    <div className="group relative overflow-hidden rounded-2xl p-5 bg-[#081122]/40 ring-1 ring-white/5 backdrop-blur-md flex flex-col justify-between h-full transition-all duration-300 hover:ring-cyan-500/30 hover:bg-[#09152a]/50 hover:shadow-2xl hover:shadow-cyan-500/5">
      <div>
        {/* CONTAINER MEDIA IMAGE */}
        <div className="relative w-full h-44 rounded-xl overflow-hidden mb-5 bg-[#040a16] border border-white/5 flex items-center justify-center">
          <img
            src={cert.imageSrc}
            alt={cert.title}
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081122]/80 via-transparent to-transparent opacity-80" />

          {/* HOVER ACCENT ELEMENT */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-[2px]">
            <div className="p-3 rounded-full bg-white/10 border border-white/20 text-white shadow-xl">
              <Award size={20} />
            </div>
          </div>
        </div>

        {/* METADATA ISSUER & YEAR */}
        <div className="flex items-center gap-2 mb-2">
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-medium font-mono tracking-wider ring-1 ring-inset ${cert.badgeColor}`}>{cert.issuer}</span>
          <span className="text-[9px] font-mono text-gray-500">• {cert.year}</span>
        </div>

        {/* TITLE */}
        <h3 className="text-sm font-bold tracking-wide uppercase text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300 flex items-start gap-1.5">
          <ShieldCheck size={14} className="text-gray-500 mt-0.5 flex-shrink-0 group-hover:text-cyan-500 transition-colors" />
          {cert.title}
        </h3>
      </div>

      {/* VERIFICATION CALLOUT LINK */}
      {cert.link && (
        <a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/5 py-2.5 text-[10px] font-mono font-bold tracking-wider text-gray-400 border border-white/5 group-hover:bg-cyan-500/10 group-hover:text-white group-hover:border-cyan-500/20 transition-all duration-300"
        >
          VERIFY CREDENTIAL <ExternalLink size={10} />
        </a>
      )}
    </div>
  );

  if (isSecondary) return cardBody;

  return <div className="w-full md:w-[calc(33.333%-16px)] min-w-[300px]">{cardBody}</div>;
}
