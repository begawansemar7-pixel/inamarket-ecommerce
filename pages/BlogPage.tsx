import React from 'react';

const posts = [
  {
    id: 1,
    title: '5 Tips Fotografi Produk Menggunakan Smartphone untuk Penjual UMKM',
    href: '#',
    description:
      'Tingkatkan daya tarik visual produk Anda tanpa perlu peralatan mahal. Pelajari trik sederhana untuk menghasilkan foto produk yang jernih dan profesional hanya dengan kamera ponsel Anda.',
    imageUrl: 'https://picsum.photos/seed/blog1/600/400',
    date: '10 Agu 2024',
    datetime: '2024-08-10',
    category: { title: 'Tips & Trik', href: '#' },
    author: {
      name: 'Tim INAMarket',
      role: 'Content Creator',
      href: '#',
      imageUrl: 'https://picsum.photos/seed/author1/40/40',
    },
  },
   {
    id: 2,
    title: 'Strategi Menentukan Harga Jual yang Tepat untuk Produk Lokal',
    href: '#',
    description:
      'Menentukan harga yang pas adalah kunci profitabilitas. Kami membahas berbagai strategi, mulai dari cost-plus pricing hingga value-based pricing, untuk membantu Anda menemukan harga terbaik.',
    imageUrl: 'https://picsum.photos/seed/blog2/600/400',
    date: '5 Agu 2024',
    datetime: '2024-08-05',
    category: { title: 'Bisnis', href: '#' },
    author: {
      name: 'Andi Pratama',
      role: 'Business Analyst',
      href: '#',
      imageUrl: 'https://picsum.photos/seed/author2/40/40',
    },
  },
   {
    id: 3,
    title: 'Memanfaatkan Media Sosial untuk Pemasaran Produk UMKM Anda',
    href: '#',
    description:
      'Di era digital, media sosial adalah alat pemasaran yang ampuh. Temukan cara efektif membangun brand awareness, berinteraksi dengan pelanggan, dan meningkatkan penjualan melalui platform populer.',
    imageUrl: 'https://picsum.photos/seed/blog3/600/400',
    date: '1 Agu 2024',
    datetime: '2024-08-01',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Dewi Lestari',
      role: 'Marketing Specialist',
      href: '#',
      imageUrl: 'https://picsum.photos/seed/author3/40/40',
    },
  },
];

const BlogPage: React.FC = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Blog INAMarket</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Wawasan, tips, dan cerita inspiratif untuk membantu pertumbuhan bisnis UMKM Anda.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex flex-col items-start justify-between bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="relative w-full">
                <img src={post.imageUrl} alt="" className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                  <a
                    href={post.category.href}
                    className="relative z-10 rounded-full bg-primary-light/20 px-3 py-1.5 font-medium text-primary-dark hover:bg-primary-light/40"
                  >
                    {post.category.title}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-100" />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href={post.author.href}>
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </a>
                    </p>
                    <p className="text-gray-600">{post.author.role}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;