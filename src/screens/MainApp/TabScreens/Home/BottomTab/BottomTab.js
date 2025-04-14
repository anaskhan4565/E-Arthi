// Import SVG assets from NewDrawerIcons folder
import ActiveHomeIcon from './Active/Home.svg';
import ActiveDashboardIcon from './Active/Dashboard.svg';
import ActiveMunshiIcon from './Active/Munshi.svg';
import ActiveWarehouseIcon from './Active/Warehouse.svg';
import ActiveCartIcon from './Active/Cart.svg';

import InactiveHomeIcon from './InActive/Home.svg';
import InactiveDashboardIcon from './InActive/Dashboard.svg';
import InactiveMunshiIcon from './InActive/Munshi.svg';
import InactiveWarehouseIcon from './InActive/Warehouse.svg';
import InactiveCartIcon from './InActive/Cart.svg';




// Import screen names constants

/**
 * Drawer navigation data with icons from NewDrawerIcons
 */
const BottomTabData = [
   {
    id: 'home',
    title: 'Home',
    icon: ActiveHomeIcon,
    inactiveIcon: InactiveHomeIcon,
   },
   {
    id: 'dashboard',
    title: 'Dashboard',
    icon: ActiveDashboardIcon,
    inactiveIcon: InactiveDashboardIcon,
   },
   {
    id: 'munshi',
    title: 'Munshi',
    icon: ActiveMunshiIcon,
    inactiveIcon: InactiveMunshiIcon,
   },
   {
    id: 'warehouse',
    title: 'Warehouse',
    icon: ActiveWarehouseIcon,
    inactiveIcon: InactiveWarehouseIcon,
   },
   {
    id: 'cart',
    title: 'Cart',
    icon: ActiveCartIcon,
    inactiveIcon: InactiveCartIcon,
   },
   
   
  
];

export default BottomTabData; 