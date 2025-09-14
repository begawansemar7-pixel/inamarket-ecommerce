import React, { useState } from 'react';
import { BusinessService, ServiceOffering } from '../../types';
import { PlusCircleIcon, PencilIcon, TrashIcon } from '../icons/Icons';
import ServiceEditModal from './ServiceEditModal';

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<ServiceOffering | null>(null);
    
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
    
    const handleHoursChange = (day: string, field: 'active' | 'open' | 'close', value: string | boolean) => {
        const newHours = { ...serviceData.operationalHours };
        const dayHours = { ...newHours[day] };
        // @ts-ignore
        dayHours[field] = value;
        newHours[day] = dayHours;
        onUpdateServices({ ...serviceData, operationalHours: newHours });
    };

    const openEditModal = (service: ServiceOffering) => {
        setEditingService(service);
        setIsModalOpen(true);
    };
    
    const openAddModal = () => {
        setEditingService(null);
        setIsModalOpen(true);
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
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Jam Operasional</h2>
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
            </div>
            
            <ServiceEditModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={editingService ? handleEditService : handleAddService}
                serviceToEdit={editingService}
            />
        </>
    );
};

export default ServiceManagementView;
