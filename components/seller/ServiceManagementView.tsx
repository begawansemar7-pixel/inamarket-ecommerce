import React, { useState } from 'react';
import { BusinessService, ServiceOffering } from '../../types';
import { PlusCircleIcon, PencilIcon, TrashIcon, WrenchScrewdriverIcon } from '../icons/Icons';
import ServiceEditModal from './ServiceEditModal';
import { SERVICE_CATEGORIES_WITH_ICONS } from '../../constants';
import ServiceCategoryEditModal from './ServiceCategoryEditModal';

const formatRupiah = (price: number): string => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
};

const days = {
    monday: 'Senin',
    tuesday: 'Selasa',
    wednesday: 'Rabu',
    thursday: 'Kamis',
    friday: 'Jumat',
    saturday: 'Sabtu',
    sunday: 'Minggu'
};

const ToggleSwitch: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void }> = ({ enabled, onChange }) => (
    <button
        type="button"
        className={`${
        enabled ? 'bg-primary' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
    >
        <span
        aria-hidden="true"
        className={`${
            enabled ? 'translate-x-5' : 'translate-x-0'
        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
    </button>
);


interface ServiceManagementViewProps {
  serviceData: BusinessService;
  onUpdateServices: (data: BusinessService) => void;
}

const ServiceManagementView: React.FC<ServiceManagementViewProps> = ({ serviceData, onUpdateServices }) => {
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<ServiceOffering | null>(null);

    // State for dynamic service categories
    const [serviceCategories, setServiceCategories] = useState(SERVICE_CATEGORIES_WITH_ICONS);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<{ name: string; icon: React.ElementType } | null>(null);
    
    const handleAddService = (newService: Omit<ServiceOffering, 'id'>) => {
        const serviceToAdd: ServiceOffering = {
            ...newService,
            id: Date.now(),
        };
        onUpdateServices({
            ...serviceData,
            serviceOfferings: [serviceToAdd, ...serviceData.serviceOfferings]
        });
    };

    const handleEditService = (updatedService: ServiceOffering) => {
        onUpdateServices({
            ...serviceData,
            serviceOfferings: serviceData.serviceOfferings.map(s => s.id === updatedService.id ? updatedService : s)
        });
    };
    
    const handleDeleteService = (serviceId: number) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus jasa ini?')) {
            onUpdateServices({
                ...serviceData,
                serviceOfferings: serviceData.serviceOfferings.filter(s => s.id !== serviceId)
            });
        }
    };

     const handleSaveCategory = ({ oldName, newName }: { oldName?: string; newName: string }) => {
        if (oldName) { // Editing existing category
            setServiceCategories(prev =>
                prev.map(cat => (cat.name === oldName ? { ...cat, name: newName } : cat))
            );
            // Also update any services using this category
            const updatedOfferings = serviceData.serviceOfferings.map(s => 
                s.category === oldName ? { ...s, category: newName } : s
            );
            onUpdateServices({ ...serviceData, serviceOfferings: updatedOfferings });

        } else { // Adding new category
            setServiceCategories(prev => [
                ...prev,
                { name: newName, icon: WrenchScrewdriverIcon } // Use a default icon for new categories
            ]);
        }
    };
    
    const handleDeleteCategory = (categoryNameToDelete: string) => {
        const isInUse = serviceData.serviceOfferings.some(s => s.category === categoryNameToDelete);
        if (isInUse) {
            alert('Tidak dapat menghapus kategori karena masih digunakan oleh salah satu jasa Anda.');
            return;
        }

        if (window.confirm(`Apakah Anda yakin ingin menghapus kategori "${categoryNameToDelete}"?`)) {
            setServiceCategories(prev => prev.filter(cat => cat.name !== categoryNameToDelete));
        }
    };

    const openCategoryModal = (category: { name: string; icon: React.ElementType } | null) => {
        setEditingCategory(category);
        setIsCategoryModalOpen(true);
    };

    const handleHoursChange = (day: string, field: 'active' | 'open' | 'close', value: string | boolean) => {
        const newHours = { ...serviceData.operationalHours };
        const dayHours = { ...newHours[day] };
        // @ts-ignore
        dayHours[field] = value;
        newHours[day] = dayHours;
        onUpdateServices({ ...serviceData, operationalHours: newHours });
    };

    const handleApplyToWeekdays = () => {
        const mondayHours = serviceData.operationalHours.monday;
        if (!mondayHours) return;

        const newHours = { ...serviceData.operationalHours };
        const weekdays = ['tuesday', 'wednesday', 'thursday', 'friday'];

        weekdays.forEach(day => {
            newHours[day] = {
                ...newHours[day],
                active: true,
                open: mondayHours.open,
                close: mondayHours.close,
            };
        });

        onUpdateServices({ ...serviceData, operationalHours: newHours });
    };

    const openEditModal = (service: ServiceOffering) => {
        setEditingService(service);
        setIsServiceModalOpen(true);
    };
    
    const openAddModal = () => {
        setEditingService(null);
        setIsServiceModalOpen(true);
    };

    return (
        <>
            <div className="space-y-8 animate-step-in">
                {/* Service Offerings */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
                        <h2 className="text-xl font-bold text-gray-800">Penawaran Jasa</h2>
                        <button 
                          onClick={openAddModal} 
                          className="flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2 rounded-md transition-colors shadow-sm w-full sm:w-auto"
                        >
                            <PlusCircleIcon className="w-5 h-5 mr-2" />
                            Tambah Jasa Baru
                        </button>
                    </div>
                    <div className="space-y-4">
                        {serviceData.serviceOfferings.length > 0 ? (
                            serviceData.serviceOfferings.map(service => (
                                <div key={service.id} className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                                    <img src={service.imageUrl} alt={service.name} className="w-full h-32 sm:w-24 sm:h-24 rounded-md object-cover flex-shrink-0" />
                                    <div className="flex-grow">
                                        <p className="text-sm font-semibold text-primary">{service.category}</p>
                                        <h3 className="font-bold text-gray-800 text-lg">{service.name}</h3>
                                        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{service.description}</p>
                                        <p className="font-bold text-lg text-primary-dark mt-2">{formatRupiah(service.price)}</p>
                                    </div>
                                    <div className="flex space-x-2 sm:flex-col sm:space-x-0 sm:space-y-2 self-start sm:self-center">
                                        <button onClick={() => openEditModal(service)} className="text-gray-500 hover:text-primary p-2" aria-label={`Edit ${service.name}`}><PencilIcon className="w-5 h-5" /></button>
                                        <button onClick={() => handleDeleteService(service.id)} className="text-gray-500 hover:text-red-500 p-2" aria-label={`Hapus ${service.name}`}><TrashIcon className="w-5 h-5"/></button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 border-dashed border-2 rounded-lg">
                                <p className="text-gray-500">Anda belum menawarkan jasa apapun.</p>
                                <p className="text-sm text-gray-400 mt-1">Klik "Tambah Jasa Baru" untuk memulai.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Operational Hours */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
                        <h2 className="text-xl font-bold text-gray-800">Jam Operasional</h2>
                        <button
                            type="button"
                            onClick={handleApplyToWeekdays}
                            className="text-sm font-medium text-primary hover:text-primary-dark transition-colors self-start sm:self-center"
                        >
                            Terapkan ke Semua Hari Kerja
                        </button>
                    </div>
                    <div className="space-y-3">
                        {Object.entries(days).map(([dayKey, dayName]) => {
                            const hours = serviceData.operationalHours[dayKey];
                            if (!hours) return null; // Safeguard
                            return (
                                <div key={dayKey} className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 p-2 rounded-md even:bg-gray-50">
                                    <div className="flex items-center space-x-3">
                                        <ToggleSwitch enabled={hours.active} onChange={val => handleHoursChange(dayKey, 'active', val)} />
                                        <span className={`font-medium ${hours.active ? 'text-gray-800' : 'text-gray-400'}`}>{dayName}</span>
                                    </div>
                                    <div className={`col-span-1 sm:col-span-2 flex items-center gap-2 ${!hours.active ? 'opacity-50 pointer-events-none' : ''}`}>
                                        <input type="time" value={hours.open} onChange={e => handleHoursChange(dayKey, 'open', e.target.value)} disabled={!hours.active} className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-primary focus:border-primary" />
                                        <span className="text-gray-500">-</span>
                                        <input type="time" value={hours.close} onChange={e => handleHoursChange(dayKey, 'close', e.target.value)} disabled={!hours.active} className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-primary focus:border-primary" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Category Management */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                     <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
                        <h2 className="text-xl font-bold text-gray-800">Manajemen Kategori Jasa</h2>
                        <button 
                          onClick={() => openCategoryModal(null)} 
                          className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-md transition-colors shadow-sm w-full sm:w-auto"
                        >
                            <PlusCircleIcon className="w-5 h-5 mr-2" />
                            Tambah Kategori Baru
                        </button>
                    </div>
                    <div className="space-y-2">
                        {serviceCategories.map(category => (
                             <div key={category.name} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                                <span className="font-medium text-gray-800">{category.name}</span>
                                <div className="flex space-x-2">
                                    <button onClick={() => openCategoryModal(category)} className="text-gray-500 hover:text-primary p-1" aria-label={`Edit ${category.name}`}><PencilIcon className="w-5 h-5" /></button>
                                    <button onClick={() => handleDeleteCategory(category.name)} className="text-gray-500 hover:text-red-500 p-1" aria-label={`Hapus ${category.name}`}><TrashIcon className="w-5 h-5"/></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <ServiceEditModal 
                isOpen={isServiceModalOpen}
                onClose={() => setIsServiceModalOpen(false)}
                onSave={editingService ? handleEditService : handleAddService}
                serviceToEdit={editingService}
                categories={serviceCategories}
            />
            <ServiceCategoryEditModal
                isOpen={isCategoryModalOpen}
                onClose={() => setIsCategoryModalOpen(false)}
                onSave={handleSaveCategory}
                categoryToEdit={editingCategory}
                existingCategories={serviceCategories.map(c => c.name)}
            />
        </>
    );
};

export default ServiceManagementView;