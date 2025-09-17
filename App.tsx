

import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AuthPage from './pages/AuthPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import SellerDashboardPage from './pages/SellerDashboardPage';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import HelpCenterPage from './pages/HelpCenterPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import ResellerProfilePage from './pages/ResellerProfilePage';
import ProductDetailModal from './components/ProductDetailModal';
import SellModal from './components/SellModal';
import Toast from './components/Toast';
import ChatPanel from './components/chat/ChatPanel';
import ContactCenterFab from './components/ContactCenterFab';
import InaContactCenter from './components/InaContactCenter';
import LoyaltyRedemptionModal from './components/LoyaltyRedemptionModal';
import { Product, CartItem, ToastMessage, Conversation, Message, PaymentOptions, PromoBannerData, HeroSlide, Seller, Page } from './types';
import { PRODUCTS, HERO_SLIDES, SELLERS } from './constants';


type UserRole = 'Buyer' | 'Seller' | 'Admin' | 'Reseller';


const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState<UserRole | null>('Seller');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals State
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isSellModalOpen, setSellModalOpen] = useState(false);
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [isChatPanelOpen, setChatPanelOpen] = useState(false);
  const [isInaContactCenterOpen, setInaContactCenterOpen] = useState(false);
  const [isRedemptionModalOpen, setRedemptionModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  // Products state
  const [products, setProducts] = useState<Product[]>(PRODUCTS);


  // Direct Sale Demo State
  const [isDirectSale, setIsDirectSale] = useState(false);
  
  // Loyalty Points State
  const [loyaltyPoints, setLoyaltyPoints] = useState(1250); // Dummy points

  // Dummy conversation data
  const [conversations, setConversations] = useState<Conversation[]>([
      {
        id: 'product-1_seller-KopiKita',
        productId: 1,
        productName: 'Kopi Gayo Asli Aceh',
        productImageUrl: 'https://picsum.photos/seed/kopi1/400/400',
        sellerName: 'Kopi Kita',
        messages: [
            { id: 'msg-1', sender: 'seller', text: 'Halo! Ada yang bisa dibantu dengan Kopi Gayo kami?', timestamp: '10:30' },
            { id: 'msg-2', sender: 'buyer', text: 'Apakah ini 100% arabika?', timestamp: '10:31' },
            { id: 'msg-3', sender: 'seller', text: 'Betul kak, 100% arabika asli dari dataran tinggi Gayo.', timestamp: '10:32' },
        ],
        unreadByBuyer: false,
      },
      {
        id: 'product-2_seller-BatikIndah',
        productId: 2,
        productName: 'Batik Tulis Madura',
        productImageUrl: 'https://picsum.photos/seed/batik1/400/400',
        sellerName: 'Batik Indah',
        messages: [
             { id: 'msg-4', sender: 'seller', text: 'Selamat datang di Batik Indah. Batik tulisnya ready stock kak, silakan diorder.', timestamp: '11:00' },
        ],
        unreadByBuyer: true,
      }
  ]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  const unreadMessageCount = useMemo(() => conversations.filter(c => c.unreadByBuyer).length, [conversations]);

  const addToast = (type: ToastMessage['type'], message: string) => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  const handleNavigate = (page: Page) => {
    setActivePage(page);
    window.scrollTo(0, 0);
  };
  
  const handleLoginSuccess = (role: UserRole) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setAuthModalOpen(false);
    if (role === 'Admin') {
      handleNavigate('admin-dashboard');
    } else if (role === 'Seller' || role === 'Reseller') {
      handleNavigate('seller-dashboard');
    } else {
      handleNavigate('home');
    }
    addToast('success', `Selamat datang! Anda berhasil masuk sebagai ${role}.`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    handleNavigate('home');
    addToast('info', 'Anda telah keluar.');
  };
  
  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setProductModalOpen(true);
  };
  
  const handleViewSellerProfile = (sellerName: string) => {
    const sellerData = SELLERS.find(s => s.name === sellerName);
    if (sellerData) {
        setSelectedSeller(sellerData);
        handleNavigate('reseller-profile');
        setProductModalOpen(false); // Close product modal if open
    } else {
        addToast('error', 'Profil penjual tidak ditemukan.');
    }
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    addToast('success', `${product.name} telah ditambahkan ke keranjang.`);
  };

  const handleBuyNow = (product: Product) => {
    const isInCart = cart.some(item => item.id === product.id);
    if (!isInCart) {
        handleAddToCart(product, 1);
    }
    handleNavigate('checkout');
  };

  const handleUpdateCartQuantity = (productId: number, newQuantity: number) => {
      if (newQuantity < 1) return;
      setCart(cart.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));
  };
  
  const handleRemoveFromCart = (productId: number) => {
      const itemToRemove = cart.find(item => item.id === productId);
      if(itemToRemove) {
          addToast('info', `${itemToRemove.name} telah dihapus dari keranjang.`);
      }
      setCart(cart.filter(item => item.id === productId));
  };
  
    const handleAddProduct = (newProductData: Partial<Product>) => {
        const newProduct: Product = {
            id: Math.max(0, ...products.map(p => p.id)) + 1,
            name: newProductData.name || 'Produk Baru Tanpa Nama',
            price: newProductData.price || 0,
            description: newProductData.description || 'Tidak ada deskripsi.',
            imageUrl: newProductData.imageUrl || 'https://picsum.photos/seed/newproduct/400/400',
            category: newProductData.category || 'Lainnya',
            seller: 'Toko Anda',
            sellerVerification: 'verified',
            location: 'Jakarta',
            reviews: [],
            sales: 0,
            stock: newProductData.stock || 10,
            discount: 0
        };
        setProducts(prev => [newProduct, ...prev]);
        addToast('success', `${newProduct.name} berhasil ditambahkan ke marketplace!`);
    };

  const handleSendMessage = (conversationId: string, text: string) => {
      setConversations(prev => prev.map(convo => {
          if (convo.id === conversationId) {
              const newMessage: Message = {
                  id: crypto.randomUUID(),
                  sender: 'buyer',
                  text,
                  timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
              };
              return { ...convo, messages: [...convo.messages, newMessage] };
          }
          return convo;
      }));
  };
  
  const handleSendMessageToSeller = (product: Product, text: string) => {
    const conversationId = `product-${product.id}_seller-${product.seller.replace(/\s+/g, '')}`;
    
    const newMessage: Message = {
        id: crypto.randomUUID(),
        sender: 'buyer',
        text,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setConversations(prev => {
        const existingConvoIndex = prev.findIndex(c => c.id === conversationId);

        if (existingConvoIndex > -1) {
            // Conversation exists, update it
            const updatedConversations = [...prev];
            const updatedConvo = { ...updatedConversations[existingConvoIndex] };
            updatedConvo.messages = [...updatedConvo.messages, newMessage];
            updatedConvo.unreadByBuyer = false; // Mark as read since we are actively sending
            updatedConversations[existingConvoIndex] = updatedConvo;
            return updatedConversations;
        } else {
            // Conversation doesn't exist, create a new one
            const newConversation: Conversation = {
                id: conversationId,
                productId: product.id,
                productName: product.name,
                productImageUrl: product.imageUrl,
                sellerName: product.seller,
                messages: [newMessage],
                unreadByBuyer: false,
            };
            return [newConversation, ...prev];
        }
    });

    addToast('success', `Pesan Anda untuk "${product.name}" telah terkirim.`);
  };

  const handleSelectConversation = (id: string) => {
      setActiveConversationId(id);
      // Mark as read
      setConversations(prev => prev.map(c => c.id === id ? { ...c, unreadByBuyer: false } : c));
  };
  
  const handleRedeemPoints = (pointsToDeduct: number, itemName: string) => {
      if (loyaltyPoints >= pointsToDeduct) {
          setLoyaltyPoints(prev => prev - pointsToDeduct);
          addToast('success', `Berhasil menukarkan ${itemName} dengan ${pointsToDeduct} poin!`);
          setRedemptionModalOpen(false);
      } else {
          addToast('error', 'Poin Anda tidak mencukupi.');
      }
  };

  // State for Admin-managed UI elements
  const [promoBannerData, setPromoBannerData] = useState<PromoBannerData>({
    enabled: true,
    imageUrl: "https://picsum.photos/seed/promo1/1600/400",
    title: "Promo Gajian Tiba!",
    subtitle: "Nikmati diskon spesial hingga 50% untuk produk-produk UMKM pilihan.",
    buttonText: "Lihat Promo"
  });
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(HERO_SLIDES);
  
  const availablePaymentOptions: PaymentOptions = {
    qris: true,
    virtualAccounts: { bca: true, mandiri: true, bri: true, bni: false },
    eWallets: { gopay: true, ovo: true, shopeePay: false, dana: true, linkAja: false },
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (activePage !== 'home') {
        handleNavigate('home');
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <HomePage products={products} onViewDetails={handleViewDetails} onAddToCart={handleAddToCart} onNavigate={handleNavigate} onSellClick={() => setSellModalOpen(true)} promoBannerData={promoBannerData} heroSlides={heroSlides} searchTerm={searchTerm} onBuyNow={handleBuyNow} onViewSellerProfile={handleViewSellerProfile} />;
      case 'cart': return <CartPage items={cart} onUpdateQuantity={handleUpdateCartQuantity} onRemoveItem={handleRemoveFromCart} onCheckout={() => handleNavigate('checkout')} onStartShopping={() => handleNavigate('home')} isDirectSale={isDirectSale} onToggleDirectSale={() => setIsDirectSale(p => !p)} loyaltyPoints={loyaltyPoints} onOpenRedemptionModal={() => setRedemptionModalOpen(true)} />;
      case 'checkout': return <CheckoutPage items={cart} onBackToHome={() => handleNavigate('home')} addToast={addToast} availablePaymentOptions={availablePaymentOptions} isDirectSale={isDirectSale} />;
      case 'reseller-profile': return selectedSeller && <ResellerProfilePage seller={selectedSeller} allProducts={products} onNavigate={handleNavigate} onViewDetails={handleViewDetails} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} onViewSellerProfile={handleViewSellerProfile} />;
      case 'admin-login': return <AdminLoginPage onLogin={handleLoginSuccess} onBackToHome={() => handleNavigate('home')} />;
      case 'admin-dashboard': return <AdminDashboardPage products={products} promoBannerData={promoBannerData} onUpdatePromoBanner={setPromoBannerData} heroSlides={heroSlides} onUpdateHeroSlides={setHeroSlides} />;
      case 'seller-dashboard': return <SellerDashboardPage onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'about': return <AboutPage />;
      case 'careers': return <CareersPage />;
      case 'blog': return <BlogPage />;
      case 'contact': return <ContactPage addToast={addToast}/>;
      case 'help-center': return <HelpCenterPage />;
      case 'privacy-policy': return <PrivacyPolicyPage />;
      case 'terms': return <TermsAndConditionsPage />;
      default: return <HomePage products={products} onViewDetails={handleViewDetails} onAddToCart={handleAddToCart} onNavigate={handleNavigate} onSellClick={() => setSellModalOpen(true)} promoBannerData={promoBannerData} heroSlides={heroSlides} searchTerm={searchTerm} onBuyNow={handleBuyNow} onViewSellerProfile={handleViewSellerProfile} />;
    }
  };

  const showHeaderFooter = activePage !== 'admin-login' && activePage !== 'admin-dashboard' && activePage !== 'seller-dashboard';

  return (
    <>
      {showHeaderFooter && (
        <Header
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          onLoginClick={() => setAuthModalOpen(true)}
          onNavigate={handleNavigate}
          activePage={activePage}
          cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          onLogout={handleLogout}
          unreadMessageCount={unreadMessageCount}
          onChatClick={() => setChatPanelOpen(true)}
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
        />
      )}
      <main key={activePage} className={`animate-page-fade-in ${!showHeaderFooter ? '' : 'pt-0'}`}>
        {renderPage()}
      </main>
      {showHeaderFooter && <Footer onNavigate={handleNavigate} addToast={addToast} />}

      {/* Modals & Overlays */}
      <AuthPage 
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onAdminLoginClick={() => {
            setAuthModalOpen(false);
            handleNavigate('admin-login');
        }}
      />
      <SellModal isOpen={isSellModalOpen} onClose={() => setSellModalOpen(false)} onAddProduct={handleAddProduct} />
      <ProductDetailModal
        isOpen={isProductModalOpen}
        onClose={() => setProductModalOpen(false)}
        product={selectedProduct}
        products={products}
        // Fix: Pass the 'handleAddToCart' function instead of the undefined 'onAddToCart'.
        onAddToCart={handleAddToCart}
        onViewDetails={handleViewDetails}
        onSendMessage={handleSendMessageToSeller}
        onBuyNow={handleBuyNow}
        onViewSellerProfile={handleViewSellerProfile}
      />
       <ChatPanel
            isOpen={isChatPanelOpen}
            onClose={() => setChatPanelOpen(false)}
            conversations={conversations}
            activeConversationId={activeConversationId}
            onSelectConversation={handleSelectConversation}
            onSendMessage={handleSendMessage}
            onBackToList={() => setActiveConversationId(null)}
       />
       <LoyaltyRedemptionModal
            isOpen={isRedemptionModalOpen}
            onClose={() => setRedemptionModalOpen(false)}
            userPoints={loyaltyPoints}
            onRedeem={handleRedeemPoints}
        />

       {/* AI Contact Center */}
      <ContactCenterFab onClick={() => setInaContactCenterOpen(true)} />
      <InaContactCenter isOpen={isInaContactCenterOpen} onClose={() => setInaContactCenterOpen(false)} />

      {/* Toasts Container */}
      <div
        aria-live="assertive"
        className="fixed inset-0 flex flex-col items-end px-4 py-6 space-y-4 pointer-events-none sm:p-6 sm:items-end z-50"
      >
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onDismiss={removeToast} />
        ))}
      </div>
      
      {/* Global CSS for animations */}
      <style>{`
        @keyframes scale-in { 0% { transform: scale(0.9); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
        
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-fade-in-backdrop { animation: fade-in 0.3s ease-out forwards; }

        @keyframes dropdown-enter { 0% { transform: scaleY(0.95); opacity: 0; } 100% { transform: scaleY(1); opacity: 1; } }
        .animate-dropdown-enter { animation: dropdown-enter 0.1s ease-out forwards; transform-origin: top; }
        
        @keyframes slide-in-left { 0% { transform: translateX(-100%); } 100% { transform: translateX(0); } }
        .animate-slide-in-left { animation: slide-in-left 0.3s ease-out forwards; }

        @keyframes auth-modal-enter { 0% { transform: scale(0.95) translateY(10px); opacity: 0; } 100% { transform: scale(1) translateY(0); opacity: 1; } }
        .animate-auth-modal-enter { animation: auth-modal-enter 0.2s ease-out forwards; }

        @keyframes step-in { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-step-in { animation: step-in 0.4s ease-out forwards; }

        @keyframes flash-bg { 0% { background-color: transparent; } 50% { background-color: #e0f2f1; } 100% { background-color: transparent; } }
        .animate-flash-bg { animation: flash-bg 0.6s ease-in-out; }
        
        @keyframes slide-up { 0% { transform: translateY(100%); } 100% { transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }

        .range-slider-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 1.25rem;
          height: 1.25rem;
          background: #0d9488;
          cursor: pointer;
          border-radius: 9999px;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          pointer-events: auto;
          margin-top: -8px; 
        }
        .range-slider-thumb::-moz-range-thumb {
          width: 1.25rem;
          height: 1.25rem;
          background: #0d9488;
          cursor: pointer;
          border-radius: 9999px;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          pointer-events: auto;
        }
      `}</style>
    </>
  );
};

export default App;