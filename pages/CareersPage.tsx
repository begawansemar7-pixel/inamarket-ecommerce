import React from 'react';
import { ChevronRightIcon } from '../components/icons/Icons';

const jobOpenings = [
  { title: 'Senior Frontend Engineer', location: 'Jakarta (Remote)', type: 'Full-time' },
  { title: 'Product Manager - Seller Experience', location: 'Bandung', type: 'Full-time' },
  { title: 'Digital Marketing Specialist', location: 'Yogyakarta', type: 'Full-time' },
  { title: 'Data Analyst', location: 'Remote', type: 'Contract' },
];

const perks = [
  'Lingkungan kerja yang kolaboratif',
  'Peluang pengembangan karir',
  'Asuransi kesehatan komprehensif',
  'Waktu kerja yang fleksibel',
  'Dampak sosial yang nyata',
  'Cuti tahunan yang kompetitif'
];


const CareersPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          src="https://picsum.photos/seed/careers-hero/1600/800"
          alt="Office"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-30"
        />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl animate-step-in">Bergabunglah dengan Tim Kami</h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 animate-step-in" style={{ animationDelay: '0.2s' }}>
              Bantu kami mewujudkan misi untuk memberdayakan UMKM di Indonesia. Jadilah bagian dari perubahan dan bangun karir yang bermakna bersama INAMarket.
            </p>
          </div>
        </div>
      </div>

      {/* Perks Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-base font-semibold leading-7 text-primary">Karir</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Mengapa Bergabung dengan Kami?</p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    Kami percaya bahwa tim yang hebat adalah kunci kesuksesan. Kami menciptakan lingkungan di mana setiap orang dapat berkembang, berinovasi, dan memberikan dampak.
                </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                    {perks.map((perk, index) => (
                         <div key={index} className="relative pl-9">
                            <dt className="inline font-semibold text-gray-900">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="absolute left-1 top-1 h-5 w-5 text-primary">
                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
                                </svg>
                                {perk}
                            </dt>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
      </div>

      {/* Job Openings Section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">Posisi Terbuka</h2>
          <div className="mt-12 max-w-3xl mx-auto space-y-4">
            {jobOpenings.map((job, index) => (
              <a href="#" key={index} className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 group">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-primary group-hover:underline">{job.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{job.location} &middot; {job.type}</p>
                  </div>
                  <ChevronRightIcon className="w-6 h-6 text-gray-400 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-600">Tidak menemukan posisi yang cocok? Kirimkan CV Anda ke</p>
            <a href="mailto:hr@inamarket.com" className="font-semibold text-primary hover:underline">hr@inamarket.com</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;