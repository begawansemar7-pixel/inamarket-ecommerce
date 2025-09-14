import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import SellerDashboardPage from './pages/SellerDashboardPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import SellModal from './components/SellModal';
import AuthPage from './pages/AuthPage';
import ProductDetailModal from './components/ProductDetailModal';
import Toast from './components/Toast';
import ChatPanel from './components/chat/ChatPanel';
import { Product, CartItem, ToastMessage, Conversation, PromoBannerData, PaymentOptions } from './types';
import { PRODUCTS, LOCATIONS, ALL_CATEGORIES } from './constants';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ProductGrid from './components/ProductGrid';
import FilterBar from './components/FilterBar';
import PromoBanner from './components/PromoBanner';
import BottomCarousel from './components/BottomCarousel';
import CollapsibleCategorySection from './components/CollapsibleCategorySection';
import { AdjustmentsHorizontalIcon, CloseIcon } from './components/icons/Icons';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import HelpCenterPage from './pages/HelpCenterPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import ContactCenterFab from './components/ContactCenterFab';
import InaContactCenter from './components/InaContactCenter';

type Page = 'home' | 'cart' | 'dashboard' | 'profile' | 'checkout' | 'admin-login' | 'admin-dashboard' | 'about' | 'careers' | 'blog' | 'contact' | 'help-center' | 'privacy-policy' | 'terms';
type UserRole = 'Buyer' | 'Seller' | 'Admin';

const App: React.FC = () => {
    // Page navigation state
    const [page, setPage] = useState<Page>('home');

    // Authentication state
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<UserRole | null>(null);

    // Modal states
    const [isSellModalOpen, setSellModalOpen] = useState(false);
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    
    // Cart state
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Toast state
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    // Chat state
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [isChatOpen, setChatOpen] = useState(false);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
    const [unreadMessageCount, setUnreadMessageCount] = useState(0);
    
    // AI Contact Center state
    const [isContactCenterOpen, setContactCenterOpen] = useState(false);

    // Product and filter state
    const [allProducts] = useState<Product[]>(PRODUCTS);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS);
    const [filters, setFilters] = useState({
        category: 'all',
        price: [0, 1500000], 
        location: 'all',
    });
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    // Recommendation state
    const [viewedCategories, setViewedCategories] = useState<Record<string, number>>({});
    const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

    // Promo Banner State
    const [promoBannerData, setPromoBannerData] = useState<PromoBannerData>({
        enabled: true,
        imageUrl: "https://picsum.photos/seed/promo-banner/1200/300",
        title: "Diskon Kilat Akhir Pekan!",
        subtitle: "Nikmati potongan harga spesial untuk produk pilihan. Jangan sampai ketinggalan!",
        buttonText: "Belanja Sekarang",
    });

    // Seller-specific payment configurations (simulated backend data)
    const [sellerPaymentConfigs] = useState<Record<string, PaymentOptions>>({
        'Kopi Kita': {
            qris: true,
            virtualAccounts: { bca: true, mandiri: true, bri: true, bni: false },
            eWallets: { gopay: true, ovo: true, shopeePay: false, dana: true, linkAja: false }
        },
        'Batik Indah': {
            qris: true,
            virtualAccounts: { bca: true, mandiri: true, bri: false, bni: true },
            eWallets: { gopay: true, ovo: true, shopeePay: true, dana: false, linkAja: false }
        },
        'Hutan Lestari': {
            qris: true,
            virtualAccounts: { bca: true, mandiri: false, bri: false, bni: false },
            eWallets: { gopay: true, ovo: false, shopeePay: false, dana: false, linkAja: false }
        },
        'Jepara Art': {
            qris: false,
            virtualAccounts: { bca: true, mandiri: true, bri: true, bni: true },
            eWallets: { gopay: false, ovo: false, shopeePay: false, dana: false, linkAja: false }
        },
        'Suara Alam': {
            qris: true,
            virtualAccounts: { bca: true, mandiri: true, bri: true, bni: true },
            eWallets: { gopay: true, ovo: true, shopeePay: true, dana: true, linkAja: true }
        },
        // Default for other sellers for broader compatibility
        'Kulit Asli': {
            qris: true,
            virtualAccounts: { bca: true, mandiri: true, bri: false, bni: false },
            eWallets: { gopay: true, ovo: true, shopeePay: false, dana: false, linkAja: false }
        },
         'Sunda Kreasi': {
            qris: true,
            virtualAccounts: { bca: true, mandiri: true, bri: false, bni: false },
            eWallets: { gopay: true, ovo: true, shopeePay: false, dana: false, linkAja: false }
        },
         'Dapur Manado': {
            qris: true,
            virtualAccounts: { bca: true, mandiri: true, bri: false, bni: false },
            eWallets: { gopay: true, ovo: true, shopeePay: false, dana: false, linkAja: false }
        },
        'Bali Spa': {
            qris: true,
            virtualAccounts: { bca: true, mandiri: true, bri: false, bni: false },
            eWallets: { gopay: true, ovo: true, shopeePay: false, dana: false, linkAja: false }
        },
        'Sumba Woven': {
            qris: true,
            virtualAccounts: { bca: true, mandiri: true, bri: false, bni: false },
            eWallets: { gopay: true, ovo: true, shopeePay: false, dana: false, linkAja: false }
        },
        'Ceria Toys': {
            qris: true,
            virtualAccounts: { bca: true, mandiri: true, bri: false, bni: false },
            eWallets: { gopay: true, ovo: true, shopeePay: false, dana: false, linkAja: false }
        }
    });
    
    // Direct sale simulation state
    const [isDirectSale, setIsDirectSale] = useState(false);


    // Memoize the cart item count calculation for consistency and performance
    const totalCartItemCount = useMemo(() => {
        return cartItems.reduce((acc, item) => acc + item.quantity, 0);
    }, [cartItems]);

    // Memoized list for featured products
    const featuredProducts = useMemo(() => {
        return [...allProducts]
            .sort((a, b) => (b.sales || 0) - (a.sales || 0))
            .slice(0, 5);
    }, [allProducts]);
    
    // Memoized list for promotional products
    const promoProducts = useMemo(() => {
        return allProducts.filter(p => p.originalPrice && p.originalPrice > p.price);
    }, [allProducts]);
    
    // Memoized list for new products
    const newProducts = useMemo(() => {
        return [...allProducts]
            .sort((a, b) => b.id - a.id) // Sort by newest ID
            .filter(p => !featuredProducts.some(fp => fp.id === p.id))
            .filter(p => !promoProducts.some(pp => pp.id === p.id))
            .slice(0, 8);
    }, [allProducts, featuredProducts, promoProducts]);

    const activeFilterCount = useMemo(() => {
        const isCategoryActive = filters.category !== 'all';
        const isLocationActive = filters.location !== 'all';
        const isPriceActive = filters.price[0] > 0 || filters.price[1] < 1500000;
        return [isCategoryActive, isLocationActive, isPriceActive].filter(Boolean).length;
    }, [filters]);

    // Calculate products relevant for each filter, excluding the filter itself
    const productsForPriceFilter = useMemo(() => {
        let tempProducts = [...allProducts];
        if (filters.category !== 'all') {
            tempProducts = tempProducts.filter(p => p.category === filters.category);
        }
        if (filters.location !== 'all') {
            tempProducts = tempProducts.filter(p => p.location === filters.location);
        }
        return tempProducts;
    }, [filters.category, filters.location, allProducts]);
    
    const showPriceFilter = useMemo(() => {
        if (productsForPriceFilter.length === 0) return false;
        const uniquePrices = new Set(productsForPriceFilter.map(p => p.price));
        return uniquePrices.size > 1; // Only show if there's a range of prices to filter
    }, [productsForPriceFilter]);

    const productsForLocationFilter = useMemo(() => {
        let tempProducts = [...allProducts];
        if (filters.category !== 'all') {
            tempProducts = tempProducts.filter(p => p.category === filters.category);
        }
        tempProducts = tempProducts.filter(p => p.price >= filters.price[0] && p.price <= filters.price[1]);
        return tempProducts;
    }, [filters.category, filters.price, allProducts]);

    const availableLocations = useMemo(() => {
        return [...new Set(productsForLocationFilter.map(p => p.location))];
    }, [productsForLocationFilter]);

    // Effect to update unread message count
    useEffect(() => {
        const unreadCount = conversations.filter(c => c.unreadByBuyer).length;
        setUnreadMessageCount(unreadCount);
    }, [conversations]);

    // Filtering logic
    useEffect(() => {
        let tempProducts = [...allProducts];

        if (filters.category !== 'all') {
            tempProducts = tempProducts.filter(p => p.category === filters.category);
        }
        if (filters.location !== 'all') {
            tempProducts = tempProducts.filter(p => p.location === filters.location);
        }
        tempProducts = tempProducts.filter(p => p.price >= filters.price[0] && p.price <= filters.price[1]);
        
        setFilteredProducts(tempProducts);
    }, [filters, allProducts]);

    // Recommendation logic
    useEffect(() => {
        const categoryEntries = Object.entries(viewedCategories);
        if (categoryEntries.length === 0) {
            setRecommendedProducts([]);
            return;
        }

        // Find the most viewed category
        const [mostViewedCategory] = categoryEntries.sort(([, a], [, b]) => b - a)[0];

        // Get products from this category, excluding those already in other sections, shuffle, and take a few
        const recommendations = allProducts
            .filter(p => p.category === mostViewedCategory)
            .filter(p => !featuredProducts.some(fp => fp.id === p.id))
            .filter(p => !promoProducts.some(pp => pp.id === p.id))
            .filter(p => !newProducts.some(np => np.id === p.id))
            .sort(() => 0.5 - Math.random()) // Shuffle
            .slice(0, 4); // Take up to 4 recommendations

        // Fallback in case all products in the top category are already displayed
        if (recommendations.length > 0) {
            setRecommendedProducts(recommendations);
        } else {
            const fallbackRecommendations = allProducts
                .filter(p => p.category === mostViewedCategory)
                .sort(() => 0.5 - Math.random())
                .slice(0, 4);
            setRecommendedProducts(fallbackRecommendations);
        }
    }, [viewedCategories, allProducts, featuredProducts, promoProducts, newProducts]);

    const handleFilterChange = (filterName: keyof typeof filters, value: any) => {
        setFilters(prev => ({...prev, [filterName]: value}));
    };
    
    const handleCategorySelect = (categoryName: string) => {
        handleFilterChange('category', categoryName);
        document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' });
        // Update browsing history for recommendations
        setViewedCategories(prev => ({
            ...prev,
            [categoryName]: (prev[categoryName] || 0) + 1,
        }));
    };

    const resetFilters = () => {
        setFilters({ category: 'all', price: [0, 1500000], location: 'all' });
    };

    const handleViewDetails = (product: Product) => {
        setSelectedProduct(product);
        // Update browsing history for recommendations
        setViewedCategories(prev => ({
            ...prev,
            [product.category]: (prev[product.category] || 0) + 1,
        }));
    };

    // Toast helper function
    const addToast = (type: ToastMessage['type'], message: string) => {
        const id = crypto.randomUUID();
        setToasts(prev => [...prev, { id, type, message }]);
    };

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    // Navigation handler
    const handleNavigate = (newPage: Page) => {
        if (newPage === 'checkout' && cartItems.length === 0) {
            addToast('info', 'Keranjang Anda kosong. Silakan tambahkan produk terlebih dahulu.');
            return;
        }
        if (newPage === page && newPage === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        setPage(newPage);
        window.scrollTo(0, 0);
    };

    // Auth handlers
    const handleLoginSuccess = (role: UserRole) => {
        setIsAuthenticated(true);
        setUserRole(role);
        setAuthModalOpen(false);
        addToast('success', `Berhasil masuk sebagai ${role}!`);
        if (role === 'Seller') {
            setPage('dashboard');
        } else if (role === 'Admin') {
            setPage('admin-dashboard');
        }
    };
    
    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        setPage('home');
        addToast('info', 'Anda telah keluar.');
    };
    
    // Cart handlers
    const handleAddToCart = (product: Product, quantity: number) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
            }
            return [...prev, { ...product, quantity }];
        });
        addToast('success', `${product.name} ditambahkan ke keranjang.`);
    };
    
    const handleUpdateCartQuantity = (productId: number, newQuantity: number) => {
        if (newQuantity < 1) {
            handleRemoveFromCart(productId);
            return;
        }
        setCartItems(prev => prev.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));
    };

    const handleRemoveFromCart = (productId: number) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
        addToast('info', 'Produk dihapus dari keranjang.');
    };

    // Chat handlers
    const handleStartChat = (product: Product) => {
        const convoId = `${product.id}-${product.seller}`;
        const existingConvo = conversations.find(c => c.id === convoId);
        if (!existingConvo) {
            const newConvo: Conversation = {
                id: convoId,
                productId: product.id,
                productName: product.name,
                productImageUrl: product.imageUrl,
                sellerName: product.seller,
                messages: [],
                unreadByBuyer: false,
            };
            setConversations(prev => [newConvo, ...prev]);
        }
        setActiveConversationId(convoId);
        setChatOpen(true);
    };
    
    const handleSendMessage = (conversationId: string, text: string) => {
        const newMessage = {
            id: crypto.randomUUID(),
            sender: 'buyer' as const,
            text,
            timestamp: new Date().toISOString()
        };
        
        setConversations(prev => prev.map(c => c.id === conversationId ? { ...c, messages: [...c.messages, newMessage], unreadByBuyer: false } : c));
        
        // Simulate seller response
        setTimeout(() => {
            const sellerMessage = {
                id: crypto.randomUUID(),
                sender: 'seller' as const,
                text: 'Terima kasih telah menghubungi kami. Segera kami balas ya.',
                timestamp: new Date().toISOString()
            };
            setConversations(prev => prev.map(c => c.id === conversationId ? { ...c, messages: [...c.messages, sellerMessage], unreadByBuyer: true } : c));
            addToast('info', 'Anda memiliki pesan baru!');
        }, 1500);
    };

    const handleSellClick = () => {
        if (isAuthenticated && userRole === 'Seller') {
            setSellModalOpen(true);
        } else {
            addToast('info', 'Anda harus masuk sebagai penjual untuk menambahkan produk.');
            setAuthModalOpen(true);
        }
    };

    const handleUpdatePromoBanner = (newData: PromoBannerData) => {
        setPromoBannerData(newData);
        addToast('success', 'Banner promosi berhasil diperbarui.');
    };

    const handleToggleDirectSale = () => {
        setIsDirectSale(prev => !prev);
        addToast('info', `Mode Transaksi Langsung ${!isDirectSale ? 'diaktifkan' : 'dinonaktifkan'}.`);
    };

    const renderPage = () => {
        switch(page) {
            case 'home':
                return (
                    <>
                        <Hero onNavigate={handleNavigate} />
                        <CollapsibleCategorySection title="Kategori Pilihan" bgColorClass="bg-white" defaultOpen={true}>
                            <CategoryGrid categories={ALL_CATEGORIES} onCategorySelect={handleCategorySelect} />
                        </CollapsibleCategorySection>
                        
                        {promoProducts.length > 0 && (
                            <section className="py-8 bg-gray-50">
                              <div className="container mx-auto px-4">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Produk Promosi</h2>
                                <ProductGrid products={promoProducts} onViewDetails={handleViewDetails} />
                              </div>
                            </section>
                        )}
                        <section className="py-8 bg-white">
                          <div className="container mx-auto px-4">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Produk Unggulan</h2>
                            <ProductGrid products={featuredProducts} onViewDetails={handleViewDetails} />
                          </div>
                        </section>
                        
                        {newProducts.length > 0 && (
                            <section className="py-8 bg-gray-50">
                              <div className="container mx-auto px-4">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Produk Terbaru</h2>
                                <ProductGrid products={newProducts} onViewDetails={handleViewDetails} />
                              </div>
                            </section>
                        )}
                        
                        {recommendedProducts.length > 0 && (
                            <section className="py-8 bg-white">
                              <div className="container mx-auto px-4">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Rekomendasi untuk Anda</h2>
                                <ProductGrid products={recommendedProducts} onViewDetails={handleViewDetails} />
                              </div>
                            </section>
                        )}

                        <PromoBanner data={promoBannerData} />

                        <section id="product-section" className="py-8 bg-white">
                          <div className="container mx-auto px-4">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Jelajahi Produk UMKM</h2>
                            
                             {/* Mobile Filter Trigger */}
                            <div className="lg:hidden mb-4">
                                <button
                                    onClick={() => setIsFilterOpen(true)}
                                    className="w-full flex justify-between items-center bg-white p-3 rounded-lg shadow border transition-colors hover:bg-gray-50"
                                >
                                    <span className="flex items-center font-semibold text-gray-700">
                                        <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2 text-primary" />
                                        Filter
                                    </span>
                                    {activeFilterCount > 0 && (
                                        <span className="bg-primary text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-scale-in">
                                            {activeFilterCount}
                                        </span>
                                    )}
                                </button>
                            </div>

                             <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                                <div className="hidden lg:block lg:col-span-1 sticky top-24">
                                    <FilterBar 
                                        filters={filters}
                                        onFilterChange={handleFilterChange}
                                        maxPrice={1500000}
                                        locations={LOCATIONS}
                                        onReset={resetFilters}
                                        availableLocations={availableLocations}
                                        showPriceFilter={showPriceFilter}
                                    />
                                </div>
                                <div className="lg:col-span-3">
                                   {filteredProducts.length > 0 ? (
                                        <ProductGrid products={filteredProducts} onViewDetails={handleViewDetails} />
                                   ) : (
                                        <div className="text-center py-16">
                                            <p className="text-gray-600 font-semibold text-lg">Oops! Tidak ada produk yang cocok.</p>
                                            <p className="text-gray-500 mt-2">Coba ubah atau reset filter Anda.</p>
                                        </div>
                                   )}
                                </div>
                             </div>
                          </div>
                        </section>
                        <BottomCarousel onNavigate={handleNavigate} onSellClick={handleSellClick} />
                    </>
                );
            case 'cart':
            case 'profile':
                return <CartPage items={cartItems} onUpdateQuantity={handleUpdateCartQuantity} onRemoveItem={handleRemoveFromCart} onCheckout={() => handleNavigate('checkout')} onStartShopping={() => handleNavigate('home')} isDirectSale={isDirectSale} onToggleDirectSale={handleToggleDirectSale} />;
            case 'checkout':
                const sellersInCart = [...new Set(cartItems.map(item => item.seller))];
                let availablePaymentOptions: PaymentOptions = {
                    qris: false,
                    virtualAccounts: { bca: false, mandiri: false, bri: false, bni: false },
                    eWallets: { gopay: false, ovo: false, shopeePay: false, dana: false, linkAja: false }
                };

                if (sellersInCart.length > 0) {
                    const firstSellerOptions = sellerPaymentConfigs[sellersInCart[0]];
                    if (firstSellerOptions) {
                        availablePaymentOptions = JSON.parse(JSON.stringify(firstSellerOptions));
                        for (let i = 1; i < sellersInCart.length; i++) {
                            const currentSellerOptions = sellerPaymentConfigs[sellersInCart[i]];
                            if (currentSellerOptions) {
                                availablePaymentOptions.qris &&= currentSellerOptions.qris;
                                (Object.keys(availablePaymentOptions.virtualAccounts) as Array<keyof typeof availablePaymentOptions.virtualAccounts>).forEach(key => {
                                    availablePaymentOptions.virtualAccounts[key] &&= currentSellerOptions.virtualAccounts[key];
                                });
                                (Object.keys(availablePaymentOptions.eWallets) as Array<keyof typeof availablePaymentOptions.eWallets>).forEach(key => {
                                    availablePaymentOptions.eWallets[key] &&= currentSellerOptions.eWallets[key];
                                });
                            }
                        }
                    }
                }
                
                return (
                    <CheckoutPage 
                        items={cartItems} 
                        onBackToHome={() => { setCartItems([]); handleNavigate('home'); addToast('success', 'Pesanan Anda berhasil dibuat!'); }} 
                        cartItemCount={totalCartItemCount} 
                        onLogout={handleLogout} 
                        isAuthenticated={isAuthenticated} 
                        onLoginClick={() => setAuthModalOpen(true)} 
                        onNavigate={handleNavigate} 
                        unreadMessageCount={unreadMessageCount} 
                        onChatClick={() => setChatOpen(true)} 
                        addToast={addToast}
                        availablePaymentOptions={availablePaymentOptions}
                        isDirectSale={isDirectSale}
                    />
                );
            case 'dashboard':
                if (isAuthenticated && userRole === 'Seller') {
                    return <SellerDashboardPage />;
                }
                handleNavigate('home'); // Redirect if not authorized
                return null;
            case 'admin-dashboard':
                 if (isAuthenticated && userRole === 'Admin') {
                    return <AdminDashboardPage 
                                promoBannerData={promoBannerData} 
                                onUpdatePromoBanner={handleUpdatePromoBanner}
                            />;
                }
                handleNavigate('home'); // Redirect if not authorized
                return null;
            case 'admin-login':
                return <AdminLoginPage onLogin={handleLoginSuccess} onBackToHome={() => handleNavigate('home')} />;
            case 'about':
                return <AboutPage />;
            case 'careers':
                return <CareersPage />;
            case 'blog':
                return <BlogPage />;
            case 'contact':
                return <ContactPage addToast={addToast} />;
            case 'help-center':
                return <HelpCenterPage />;
            case 'privacy-policy':
                return <PrivacyPolicyPage />;
            case 'terms':
                return <TermsAndConditionsPage />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {page !== 'admin-login' && page !== 'admin-dashboard' && (
                 <Header
                    isAuthenticated={isAuthenticated}
                    userRole={userRole}
                    onLoginClick={() => setAuthModalOpen(true)}
                    onSellClick={handleSellClick}
                    onNavigate={handleNavigate}
                    activePage={page}
                    cartItemCount={totalCartItemCount}
                    onLogout={handleLogout}
                    unreadMessageCount={unreadMessageCount}
                    onChatClick={() => setChatOpen(!isChatOpen)}
                 />
            )}
           
            <main className="flex-grow">
                {renderPage()}
            </main>
            
            {page !== 'admin-login' && page !== 'admin-dashboard' && <Footer onNavigate={handleNavigate} addToast={addToast} />}

            {/* Mobile Filter Overlay */}
            {isFilterOpen && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col justify-end lg:hidden animate-fade-in" onClick={() => setIsFilterOpen(false)}>
                    <div 
                        className="bg-gray-50 rounded-t-2xl shadow-lg max-h-[85vh] flex flex-col animate-slide-up"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="p-4 border-b flex justify-between items-center flex-shrink-0 bg-white rounded-t-2xl">
                            <h2 className="text-xl font-bold text-gray-800">Filter</h2>
                            <button onClick={() => setIsFilterOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                                <CloseIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="overflow-y-auto">
                            <FilterBar 
                                filters={filters}
                                onFilterChange={handleFilterChange}
                                maxPrice={1500000}
                                locations={LOCATIONS}
                                onReset={resetFilters}
                                availableLocations={availableLocations}
                                showPriceFilter={showPriceFilter}
                            />
                        </div>
                         <div className="p-4 border-t bg-white flex-shrink-0">
                            <button onClick={() => setIsFilterOpen(false)} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg shadow-sm transition-colors">
                                Lihat Hasil
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modals and Overlays */}
            <SellModal isOpen={isSellModalOpen} onClose={() => setSellModalOpen(false)} />
            <AuthPage isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} onLoginSuccess={handleLoginSuccess} onAdminLoginClick={() => { setAuthModalOpen(false); handleNavigate('admin-login'); }} />
            <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={handleAddToCart} onStartChat={handleStartChat} />
            <ChatPanel
                isOpen={isChatOpen}
                onClose={() => setChatOpen(false)}
                conversations={conversations}
                activeConversationId={activeConversationId}
                onSelectConversation={id => setActiveConversationId(id)}
                onSendMessage={handleSendMessage}
                onBackToList={() => setActiveConversationId(null)}
            />
            {page !== 'admin-login' && <ContactCenterFab onClick={() => setContactCenterOpen(true)} />}
            <InaContactCenter isOpen={isContactCenterOpen} onClose={() => setContactCenterOpen(false)} />
             <div
              aria-live="assertive"
              className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50"
            >
              <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                {toasts.map((toast) => (
                  <Toast key={toast.id} toast={toast} onDismiss={removeToast} />
                ))}
              </div>
            </div>
        </div>
    );
};

export default App;