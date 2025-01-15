import { useState } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  onFilter: (status: string) => void;
}

export function SearchBar({ onSearch, onFilter }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
      <input
        type="text"
        placeholder="Pesquisar por nome"
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full sm:w-auto p-2 border border-gray-300 rounded-md"
      />
      <select
        value={status}
        onChange={handleStatusChange}
        className="w-full sm:w-auto p-2 border border-gray-300 rounded-md"
      >
        <option value="">Todos os Status</option>
        <option value="APPROVED">Aprovado</option>
        <option value="REJECTED">Rejeitado</option>
        <option value="PENDING">Pendente</option>
      </select>
    </div>
  );
}