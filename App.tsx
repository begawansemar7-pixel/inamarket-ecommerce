import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Product, CartItem, Conversation, Message, Address, ShippingOption } from './types';
import { PRODUCTS, CATEGORIES, SHIPPING_OPTIONS } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ProductGrid from './components/ProductGrid';
import FilterSidebar from './components/FilterBar';
import SellModal from './components/SellModal';
import ProductDetailModal from './components/ProductDetailModal';
import AuthPage from './pages/AuthPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import SellerDashboardPage from './pages/SellerDashboardPage';
import AdminLoginPage from './pages/AdminLoginPage';
import Toast, { ToastMessage } from './components/Toast';
import ChatPanel from './components/chat/ChatPanel';
import AddProductModal from './components/AddProductModal';

type Page = 'home' | 'cart' | 'dashboard' | 'profile' | 'checkout' | 'admin-login';
type UserRole = 'Buyer' | 'Seller' | 'Admin';

const HomePage: React.FC<{
    onProductClick: (product: Product) => void;
    onAddToCart: (product: Product, quantity: number) => void;
}> = ({ onProductClick, onAddToCart }) => {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS);
    const maxPrice = useMemo(() => Math.max(...PRODUCTS.map(p => p.price)), []);
    const locations = useMemo(() => [...new Set(PRODUCTS.map(p => p.location))], []);

    const [filters, setFilters] = useState({
        category: 'all',
        price: [0, maxPrice],
        location: 'all',
    });

    const handleFilterChange = useCallback((filterName: keyof typeof filters, value: string | number[]) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters({
            category: 'all',
            price: [0, maxPrice],
            location: 'all',
        });
    }, [maxPrice]);
    
    useEffect(() => {
        let tempProducts = [...PRODUCTS];
        if (filters.category !== 'all') {
            tempProducts = tempProducts.filter(p => p.category === filters.category);
        }
        if (filters.location !== 'all') {
            tempProducts = tempProducts.filter(p => p.location === filters.location);
        }
        tempProducts = tempProducts.filter(p => p.price >= filters.price[0] && p.price <= filters.price[1]);

        setFilteredProducts(tempProducts);
    }, [filters]);


    return (
        <>
            <Hero />
            <CategoryGrid onCategorySelect={(category) => handleFilterChange('category', category)} />
            <div className="container mx-auto px-4 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <aside className="md:col-span-1">
                       <FilterSidebar 
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            maxPrice={maxPrice}
                            locations={locations}
                            onReset={resetFilters}
                       />
                    </aside>
                    <main className="md:col-span-3">
                        <ProductGrid
                            title="Produk Populer"
                            products={filteredProducts}
                            onProductClick={onProductClick}
                            onAddToCart={onAddToCart}
                            onResetFilters={resetFilters}
                        />
                    </main>
                </div>
            </div>
        </>
    );
};


const App: React.FC = () => {
    const [activePage, setActivePage] = useState<Page>('home');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<UserRole | null>(null);
    
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const [isSellModalOpen, setSellModalOpen] = useState(false);
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);
    const [isProductDetailModalOpen, setProductDetailModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    
    // Chat state
    const [isChatOpen, setChatOpen] = useState(false);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const unreadMessageCount = conversations.filter(c => c.unreadByBuyer).length;

    // Seller product management state
    const [sellerProducts, setSellerProducts] = useState<Product[]>(() => {
        // Simulate fetching products for the logged-in seller
        return PRODUCTS.filter(p => p.seller === 'Kopi Kita' || p.seller === 'Batik Indah');
    });
    const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);

    const addToast = useCallback((type: 'success' | 'error' | 'info', message: string) => {
        const id = new Date().toISOString();
        setToasts(prev => [...prev, { id, type, message }]);
    }, []);
    
    const dismissToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    const handleAddToCart = (product: Product, quantity: number) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...prevItems, { ...product, quantity }];
        });
        addToast('success', `${product.name} ditambahkan ke keranjang!`);
    };
    
    const handleUpdateCartQuantity = (productId: number, newQuantity: number) => {
        if (newQuantity < 1) {
            handleRemoveFromCart(productId);
            return;
        }
        setCartItems(prev => prev.map(item => item.id === productId ? {...item, quantity: newQuantity} : item));
    };

    const handleRemoveFromCart = (productId: number) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
        addToast('info', `Item dihapus dari keranjang.`);
    };

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setProductDetailModalOpen(true);
    };

    const handleLoginSuccess = (role: UserRole) => {
        setIsAuthenticated(true);
        setUserRole(role);
        setAuthModalOpen(false);
        if (role === 'Seller' || role === 'Admin') {
            setActivePage('dashboard');
        }
        addToast('success', `Selamat datang, ${role}!`);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        setActivePage('home');
        addToast('info', 'Anda telah keluar.');
    };

    const handleNavigate = (page: Page) => {
        if (page === 'checkout' && cartItems.length === 0) {
            addToast('info', 'Keranjang Anda kosong. Tambahkan produk untuk checkout.');
            setActivePage('home');
            return;
        }
        if (page === 'checkout' && !isAuthenticated) {
            addToast('info', 'Silakan masuk untuk melanjutkan checkout.');
            setAuthModalOpen(true);
            return;
        }
        setActivePage(page);
        window.scrollTo(0, 0);
    };

    const handleSaveProduct = (newProductData: Omit<Product, 'id' | 'seller' | 'reviews' | 'sellerVerification' | 'sales'>) => {
        const newProduct: Product = {
            ...newProductData,
            id: Math.max(...[...PRODUCTS, ...sellerProducts].map(p => p.id)) + 1,
            seller: 'Toko Saya', // Placeholder for logged-in seller name
            sellerVerification: 'verified', // Assume seller is verified
            reviews: [],
            sales: 0,
        };
        setSellerProducts(prev => [newProduct, ...prev]);
        setAddProductModalOpen(false);
        addToast('success', 'Produk berhasil ditambahkan!');
    };

    const handleStartChat = (product: Product) => {
        const conversationId = `${product.seller}-${product.id}`;
        const existingConvo = conversations.find(c => c.id === conversationId);
        if (!existingConvo) {
            const newConvo: Conversation = {
                id: conversationId,
                productId: product.id,
                productName: product.name,
                productImageUrl: product.imageUrl,
                sellerName: product.seller,
                messages: [],
                unreadByBuyer: false,
            };
            setConversations(prev => [newConvo, ...prev]);
        }
        setActiveConversationId(conversationId);
        setChatOpen(true);
    };

    const handleSendMessage = (conversationId: string, text: string) => {
        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            text,
            sender: 'buyer',
            timestamp: Date.now()
        };
        setConversations(prev => prev.map(c => c.id === conversationId ? { ...c, messages: [...c.messages, newMessage], unreadByBuyer: false } : c));
        
        // Simulate seller response
        setTimeout(() => {
            const sellerMessage: Message = {
                id: `msg-${Date.now() + 1}`,
                text: "Terima kasih atas pesan Anda. Kami akan segera merespons.",
                sender: 'seller',
                timestamp: Date.now() + 1
            };
            setConversations(prev => prev.map(c => c.id === conversationId ? { ...c, messages: [...c.messages, sellerMessage], unreadByBuyer: true } : c));
        }, 2000);
    };

    const handleSelectConversation = (id: string) => {
        setActiveConversationId(id);
        setConversations(prev => prev.map(c => c.id === id ? { ...c, unreadByBuyer: false } : c));
    };

    const renderPage = () => {
        switch (activePage) {
            case 'cart':
                return <CartPage items={cartItems} onUpdateQuantity={handleUpdateCartQuantity} onRemoveItem={handleRemoveFromCart} />;
            case 'checkout':
                return <CheckoutPage 
                            items={cartItems} 
                            onBackToHome={() => setActivePage('home')} 
                            cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                            onLogout={handleLogout}
                            isAuthenticated={isAuthenticated}
                            onLoginClick={() => setAuthModalOpen(true)}
                            onNavigate={handleNavigate}
                            unreadMessageCount={unreadMessageCount}
                            onChatClick={() => setChatOpen(true)}
                        />;
            case 'dashboard':
                 return <SellerDashboardPage 
                            onNavigate={handleNavigate}
                            cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                            onLogout={handleLogout}
                            isAuthenticated={isAuthenticated}
                            onLoginClick={() => setAuthModalOpen(true)}
                            unreadMessageCount={unreadMessageCount}
                            onChatClick={() => setChatOpen(true)}
                            sellerProducts={sellerProducts}
                            onOpenAddProductModal={() => setAddProductModalOpen(true)}
                         />;
            case 'admin-login':
                return <AdminLoginPage onLogin={handleLoginSuccess} onBackToHome={() => setActivePage('home')} />;
            case 'home':
            default:
                return <HomePage onProductClick={handleProductClick} onAddToCart={handleAddToCart} />;
        }
    };
    
    // Don't render Header/Footer on admin login page
    const showLayout = activePage !== 'admin-login' && activePage !== 'checkout' && activePage !== 'dashboard';

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {showLayout && (
                <Header
                    isAuthenticated={isAuthenticated}
                    onLoginClick={() => setAuthModalOpen(true)}
                    onSellClick={() => {
                        if (isAuthenticated && (userRole === 'Seller' || userRole === 'Admin')) {
                            setSellModalOpen(true);
                        } else {
                            addToast('info', 'Fitur ini hanya untuk penjual. Silakan masuk sebagai penjual.');
                            setAuthModalOpen(true);
                        }
                    }}
                    onNavigate={handleNavigate}
                    activePage={activePage}
                    onProfileClick={() => handleNavigate('profile')}
                    cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    onLogout={handleLogout}
                    unreadMessageCount={unreadMessageCount}
                    onChatClick={() => setChatOpen(true)}
                />
            )}

            <main className={`flex-grow ${showLayout ? '' : 'w-full'}`}>
                {renderPage()}
            </main>

            {showLayout && <Footer />}

            {isSellModalOpen && <SellModal isOpen={isSellModalOpen} onClose={() => setSellModalOpen(false)} />}
            
            {isProductDetailModalOpen && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={() => setProductDetailModalOpen(false)}
                    onAddToCart={handleAddToCart}
                    onStartChat={handleStartChat}
                />
            )}
            
            {isAuthModalOpen && (
                <AuthPage 
                    isOpen={isAuthModalOpen} 
                    onClose={() => setAuthModalOpen(false)} 
                    onLoginSuccess={handleLoginSuccess}
                    onAdminLoginClick={() => {
                        setAuthModalOpen(false);
                        setActivePage('admin-login');
                    }}
                />
            )}

            {isAddProductModalOpen && (
                <AddProductModal
                    isOpen={isAddProductModalOpen}
                    onClose={() => setAddProductModalOpen(false)}
                    onSave={handleSaveProduct}
                />
            )}
            
            <ChatPanel
                isOpen={isChatOpen}
                onClose={() => setChatOpen(false)}
                conversations={conversations}
                activeConversationId={activeConversationId}
                onSelectConversation={handleSelectConversation}
                onSendMessage={handleSendMessage}
                onBackToList={() => setActiveConversationId(null)}
            />

            <div
                aria-live="assertive"
                className="fixed inset-0 flex flex-col items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-[100]"
            >
                <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                    {toasts.map(toast => (
                        <Toast key={toast.id} toast={toast} onDismiss={dismissToast} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;