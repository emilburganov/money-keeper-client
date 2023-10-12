import { useContext } from 'react';
import {StoreContext} from '@/context'

export const useStores = () => {
    return useContext(StoreContext);
}