/* eslint-disable react-hooks/exhaustive-deps */
import Api from '@/api';
import { IProduct } from '@/interfaces/IProduct';
import { usefilterStore } from '@/store/useFilter';
import { usePaginationStore } from '@/store/usePagination';
import { useProductStore } from '@/store/useProductStore';
import { useEffect, useState } from 'react';

const UseFilterProduct = () => {
  const [data, setData] = useState<IProduct[]>([]);
  const [uniqueData, setUniqueData] = useState({
    typeFish: new Set(),
    status: new Set(),
    util: new Set(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    typeFish: null,
    status: null,
    util: null,
    search: '',
  });
  const setFiltered = usefilterStore((x) => x.setFiltered);
  const products = useProductStore((x) => x.products)
  const setIsPagination = usePaginationStore((x) => x.setIsPagination)

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await Api.get('/species/all');
      const data = response.data;
      processUniqueData(data);
      setData(data);
    } catch (error) {
      console.log('Something went wrong when getting data!', error);
    }
    setIsLoading(false);
  };

  const processUniqueData = (data: any) => {
    const typeFishSet = new Set();
    const statusSet = new Set();
    const utilSet = new Set();

    data.forEach((item: any) => {
      item.typeOfFish.split(',').forEach((type: any) => typeFishSet.add(type.trim()));
      item.statusInIndonesia.split(',').forEach((status: any) => statusSet.add(status.trim()));
      item.fishUtilization.split(',').forEach((util: any) => utilSet.add(util.trim()));
    });

    setUniqueData({
      typeFish: typeFishSet,
      status: statusSet,
      util: utilSet,
    });
  };

  const applyFilters = () => {
    let filtered = data;

    const areFiltersEmpty = !filters.typeFish && !filters.status && !filters.util && !filters.search;

    if (areFiltersEmpty) {
      setIsPagination(true)
      setFiltered(products);
      return;
    }

    if (filters.search) {
      filtered = filtered.filter(item =>
        (item.indonesianName && item.indonesianName.toLowerCase().includes(filters.search.toLowerCase())) || (item.englishName && item.englishName.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    if (filters.typeFish) {
      filtered = filtered.filter(item =>
        item.typeOfFish.split(',').map(type => type.trim()).includes(filters.typeFish!)
      );
    }

    if (filters.status) {
      filtered = filtered.filter(item =>
        item.statusInIndonesia.split(',').map(status => status.trim()).includes(filters.status!)
      );
    }

    if (filters.util) {
      filtered = filtered.filter(item =>
        item.fishUtilization.split(',').map(util => util.trim()).includes(filters.util!)
      );
    }

    setIsPagination(false)
    setFiltered(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  return {
    uniqueData,
    isLoading,
    setFilters,
  };
};

export default UseFilterProduct;
