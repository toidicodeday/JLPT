import { lazy } from 'react'
import IRoute from '../core/objects/IRoute'
import { AiFillSetting, AiFillPieChart } from 'react-icons/ai'
import { TbTruckDelivery } from 'react-icons/tb'
import { RiCustomerServiceFill, RiFileUserFill } from 'react-icons/ri'
import {
  MdAddBusiness,
  MdLocalTaxi,
  MdNotificationsActive,
  MdSupervisedUserCircle,
} from 'react-icons/md'
import { MENU_ACCESS_KEY } from '@/utils/constant/constant'
import { lazyRetry } from '@/utils/helpers/routes.helper'
import { HiDocumentReport } from 'react-icons/hi'

//! Pages
const ProfilePage = lazy(() => lazyRetry(() => import('@/pages/Profile')))
const DashboardPage = lazy(() => lazyRetry(() => import('@/pages/Dashboard')))
const ServiceList = lazy(() =>
  lazyRetry(() => import('@/pages/ServiceManagement/ServiceList')),
)
const ServiceDetails = lazy(() =>
  lazyRetry(() => import('@/pages/ServiceManagement/ServiceDetails')),
)
const PartnerDiscountSettings = lazy(() =>
  lazyRetry(() => import('@/pages/PartnerDiscountSettings')),
)
const AddNewProgramDiscount = lazy(() =>
  lazyRetry(
    () => import('@/pages/PartnerDiscountSettings/AddNewProgramDiscount'),
  ),
)
const DetailProgramDiscount = lazy(() =>
  lazyRetry(
    () => import('@/pages/PartnerDiscountSettings/DetailProgramDiscount'),
  ),
)
const HomePageSettings = lazy(() =>
  lazyRetry(() => import('@/pages/System/HomePage')),
)
const ChatNCallLogs = lazy(() =>
  lazyRetry(() => import('@/pages/System/ChatCallLogs/ChatnCallLogs')),
)
const ChatnCallLogsDetails = lazy(() =>
  lazyRetry(() => import('@/pages/System/ChatCallLogs/ChatnCallLogsDetails')),
)
const ContactInfo = lazy(() => lazyRetry(() => import('@/pages/ContactInfo')))
const PromotionManagement = lazy(() =>
  lazyRetry(() => import('@/pages/PromotionManagement')),
)
const PromotionDetail = lazy(() =>
  lazyRetry(
    () => import('@/pages/PromotionManagement/components/PromotionDetail'),
  ),
)
const PromotionAddNew = lazy(() =>
  lazyRetry(
    () => import('@/pages/PromotionManagement/components/PromotionAddNew'),
  ),
)
const ContractManagement = lazy(() =>
  lazyRetry(() => import('@/pages/ContractManagement')),
)
const ContractAddNew = lazy(() =>
  lazyRetry(
    () => import('@/pages/ContractManagement/components/ContractAddNew'),
  ),
)
const ContractDetail = lazy(() =>
  lazyRetry(
    () => import('@/pages/ContractManagement/components/ContractDetail'),
  ),
)
const StaffAccountList = lazy(() =>
  lazyRetry(() => import('@/pages/StaffAccount/StaffAccountList')),
)
const StaffAccountDetails = lazy(() =>
  lazyRetry(() => import('@/pages/StaffAccount/StaffAccountDetails')),
)
const StaffAccountCreation = lazy(() =>
  lazyRetry(() => import('@/pages/StaffAccount/StaffAccountCreation')),
)
const TruckOrderList = lazy(() =>
  lazyRetry(() => import('@/pages/TruckOrderList')),
)
const TruckOrderDetails = lazy(() =>
  lazyRetry(() => import('@/pages/TruckOrderDetails')),
)
const TruckOrderCreate = lazy(() =>
  lazyRetry(() => import('@/pages/TruckOrderCreation')),
)
const CustomerAccList = lazy(() =>
  lazyRetry(() => import('@/pages/CustomerAccountList')),
)
const CustomerAccDetails = lazy(() =>
  lazyRetry(() => import('@/pages/CustomerAccountDetails')),
)
const RoleList = lazy(() => lazyRetry(() => import('@/pages/RoleList')))
const Authorization = lazy(() =>
  lazyRetry(() => import('@/pages/AuthorizationSettings')),
)
const AdminNotiList = lazy(() =>
  lazyRetry(() => import('@/pages/AdminNotiList')),
)
const AdminNotiCreation = lazy(() =>
  lazyRetry(() => import('@/pages/AdminNotiCreation')),
)
const AdminNotiDetails = lazy(() =>
  lazyRetry(() => import('@/pages/AdminNotiDetails')),
)
const SystemNotificationList = lazy(() =>
  lazyRetry(() => import('@/pages/SystemNotiList')),
)
const PartnerList = lazy(() =>
  lazyRetry(() => import('@/pages/Partner/PartnerList')),
)
const PartnerDetails = lazy(() =>
  lazyRetry(() => import('@/pages/Partner/PartnerDetails')),
)
const DriverList = lazy(() =>
  lazyRetry(() => import('@/pages/Driver/DriverList')),
)
const DriverDetails = lazy(() =>
  lazyRetry(() => import('@/pages/Driver/DriverDetails')),
)
const DriverCreation = lazy(() =>
  lazyRetry(() => import('@/pages/Driver/DriverCreation')),
)
const TeamList = lazy(() => lazyRetry(() => import('@/pages/TeamList')))
const TeamDetails = lazy(() => lazyRetry(() => import('@/pages/TeamDetails')))
const TeamCreation = lazy(() => lazyRetry(() => import('@/pages/TeamCreation')))
const VehicleCategoryList = lazy(() =>
  lazyRetry(() => import('@/pages/VehicleCategory/VehicleCategoryList')),
)
const VehicleCategoryCreation = lazy(() =>
  lazyRetry(() => import('@/pages/VehicleCategory/VehicleCategoryCreation')),
)
const VehicleCategoryDetails = lazy(() =>
  lazyRetry(() => import('@/pages/VehicleCategory/VehicleCategoryDetails')),
)
const VehicleList = lazy(() => lazyRetry(() => import('@/pages/VehicleList')))
const VehicleDetails = lazy(() =>
  lazyRetry(() => import('@/pages/VehicleDetails')),
)
const VehicleCreation = lazy(() =>
  lazyRetry(() => import('@/pages/VehicleCreation')),
)
const ChatPage = lazy(() => lazyRetry(() => import('@/pages/Chat')))
const GuestType = lazy(() => lazyRetry(() => import('@/pages/GuestTypeList')))
const TaxAndFeeSetting = lazy(() =>
  lazyRetry(() => import('@/pages/TaxAndFeeSetting')),
)
const AdvertismentManagement = lazy(() =>
  lazyRetry(() => import('@/pages/AdvertismentManagement')),
)
const AdvertismentAddNew = lazy(() =>
  lazyRetry(
    () => import('@/pages/AdvertismentManagement/AdvertismentManagementAddNew'),
  ),
)
const AdvertismentDetail = lazy(() =>
  lazyRetry(
    () => import('@/pages/AdvertismentManagement/AdvertismentManagementDetail'),
  ),
)
const IncomReport = lazy(() => lazyRetry(() => import('@/pages/IncomeReport')))
const PartnerIcomeReport = lazy(() =>
  lazyRetry(() => import('@/pages/PartnerIncomeReport')),
)
const OnDevelopingPage = lazy(() =>
  lazyRetry(() => import('@/pages/OnDevelopingPages')),
)

const routes: IRoute[] = [
  {
    path: '/',
    key: 'home',
    name: 'Home',
    hidden: true,
    redirect: '/dashboard',
    accessKey: MENU_ACCESS_KEY.dashboard,
  },
  {
    path: '/profile',
    key: 'profile',
    name: 'Profile',
    hidden: true,
    component: ProfilePage,
  },
  {
    path: '/dashboard',
    key: '/dashboard',
    name: 'Dashboard',
    icon: AiFillPieChart,
    component: DashboardPage,
    accessKey: MENU_ACCESS_KEY.dashboard,
  },
  {
    path: '/chuyen-hang',
    key: 'chuyen-hang',
    name: 'Chuyển hàng',
    icon: MdLocalTaxi,
    accessKey: MENU_ACCESS_KEY.orderManage,
    children: [
      {
        path: '/taxi-tai',
        key: 'taxi-tai',
        name: 'Taxi tải',
        component: TruckOrderList,
        accessKey: MENU_ACCESS_KEY.txOrder,
        children: [
          {
            path: '/them-moi',
            key: 'them-moi',
            hidden: true,
            name: 'Thêm mới chuyến hàng xe tải',
            component: TruckOrderCreate,
            accessKey: MENU_ACCESS_KEY.createTxOrder,
          },
          {
            path: '/chi-tiet',
            key: 'chi-tiet',
            hidden: true,
            name: 'Chi tiết',
            component: TruckOrderDetails,
            accessKey: MENU_ACCESS_KEY.txOrder,
          },
        ],
      },
      {
        path: '/dat-xe',
        key: 'dat-xe',
        name: 'Đặt xe',
        component: OnDevelopingPage,
        accessKey: MENU_ACCESS_KEY.cnOrder,
        children: [
          {
            path: '/them-moi',
            key: 'them-moi',
            hidden: true,
            name: 'Thêm mới chuyến đặt xe, xe ghép',
            component: OnDevelopingPage,
            accessKey: MENU_ACCESS_KEY.createCnOrder,
          },
          {
            path: '/chi-tiet',
            key: 'chi-tiet',
            hidden: true,
            name: 'Chi tiết',
            component: OnDevelopingPage,
            accessKey: MENU_ACCESS_KEY.cnOrder,
          },
        ],
      },
    ],
  },
  {
    path: '/khach-hang',
    key: 'khach-hang',
    name: 'Khách hàng',
    icon: MdSupervisedUserCircle,
    component: CustomerAccList,
    accessKey: MENU_ACCESS_KEY.customer,
    children: [
      {
        path: '/chi-tiet',
        key: 'chi-tiet',
        hidden: true,
        name: 'Chi tiết',
        component: CustomerAccDetails,
        accessKey: MENU_ACCESS_KEY.customer,
      },
    ],
  },
  {
    path: '/doi-tac',
    key: 'doi-tac',
    name: 'Đối tác đăng ký',
    icon: MdAddBusiness,
    component: PartnerList,
    accessKey: MENU_ACCESS_KEY.partner,
    children: [
      {
        path: '/chi-tiet',
        key: 'chi-tiet',
        hidden: true,
        name: 'Chi tiết',
        component: PartnerDetails,
        accessKey: MENU_ACCESS_KEY.partner,
      },
    ],
  },
  {
    path: '/quan-ly-xe',
    key: 'quan-ly-xe',
    name: 'Quản lý xe',
    icon: TbTruckDelivery,
    accessKey: MENU_ACCESS_KEY.vehicleManage,
    children: [
      {
        path: '/loai-xe',
        key: 'loai-xe',
        name: 'Loại xe',
        component: VehicleCategoryList,
        accessKey: MENU_ACCESS_KEY.vehicleCategory,
        children: [
          {
            path: '/them-moi',
            key: 'them-moi',
            hidden: true,
            name: 'Thêm mới loại xe',
            component: VehicleCategoryCreation,
            accessKey: MENU_ACCESS_KEY.createVehicleCategory,
          },
          {
            path: '/chi-tiet',
            key: 'chi-tiet',
            hidden: true,
            name: 'Chi tiết',
            component: VehicleCategoryDetails,
            accessKey: MENU_ACCESS_KEY.vehicleCategory,
          },
        ],
      },
      {
        path: '/danh-sach-xe',
        key: 'danh-sach-xe',
        name: 'Danh sách xe',
        component: VehicleList,
        accessKey: MENU_ACCESS_KEY.vehicle,
        children: [
          {
            path: '/chi-tiet',
            key: 'chi-tiet',
            hidden: true,
            name: 'Danh sách xe',
            component: VehicleDetails,
            accessKey: MENU_ACCESS_KEY.vehicle,
          },
          {
            path: '/them-moi',
            key: 'them-moi',
            hidden: true,
            name: 'Danh sách xe',
            component: VehicleCreation,
            accessKey: MENU_ACCESS_KEY.createVehicle,
          },
        ],
      },
      {
        path: '/tai-xe',
        key: 'tai-xe',
        name: 'Tài xế',
        component: DriverList,
        accessKey: MENU_ACCESS_KEY.driver,
        children: [
          {
            path: '/chi-tiet',
            key: 'chi-tiet',
            hidden: true,
            name: 'Tài xế',
            component: DriverDetails,
            accessKey: MENU_ACCESS_KEY.driver,
          },
          {
            path: '/them-moi',
            key: 'them-moi',
            hidden: true,
            name: 'Tài xế',
            component: DriverCreation,
            accessKey: MENU_ACCESS_KEY.createDriver,
          },
        ],
      },
      {
        path: '/doi-xe',
        key: 'doi-xe',
        name: 'Đội xe',
        component: TeamList,
        accessKey: MENU_ACCESS_KEY.driverTeam,
        children: [
          {
            path: '/chi-tiet',
            key: 'chi-tiet',
            hidden: true,
            name: 'Đội xe',
            component: TeamDetails,
            accessKey: MENU_ACCESS_KEY.driverTeam,
          },
          {
            path: '/them-moi',
            key: 'them-moi',
            hidden: true,
            name: 'Đội xe',
            component: TeamCreation,
            accessKey: MENU_ACCESS_KEY.driverTeam,
          },
        ],
      },
    ],
  },
  {
    path: '/quan-ly-tai-khoan',
    key: 'quan-ly-tai-khoan',
    name: 'Quản lý tài khoản',
    icon: RiFileUserFill,
    accessKey: MENU_ACCESS_KEY.accountManage,
    children: [
      {
        path: '/tai-khoan',
        key: 'tai-khoan',
        name: 'Tài khoản',
        component: StaffAccountList,
        accessKey: MENU_ACCESS_KEY.account,
        children: [
          {
            path: '/chi-tiet',
            key: 'chi-tiet',
            hidden: true,
            name: 'Tài xế',
            component: StaffAccountDetails,
            accessKey: MENU_ACCESS_KEY.account,
          },
          {
            path: '/them-moi',
            key: 'them-moi',
            hidden: true,
            name: 'Tài xế',
            component: StaffAccountCreation,
            accessKey: MENU_ACCESS_KEY.createAccount,
          },
        ],
      },
      {
        path: '/phan-quyen',
        key: 'phan-quyen',
        name: 'Phân quyền',
        component: Authorization,
        accessKey: MENU_ACCESS_KEY.authorize,
      },
      {
        path: '/quyen',
        key: 'quyen',
        name: 'Quyền',
        component: RoleList,
        accessKey: MENU_ACCESS_KEY.role,
      },
    ],
  },
  {
    path: '/bao-cao',
    key: 'bao-cao',
    name: 'Báo cáo',
    icon: HiDocumentReport,
    accessKey: MENU_ACCESS_KEY.reportManage,
    children: [
      {
        path: '/doanh-thu',
        key: 'bao-cao-doanh-thu',
        name: 'Báo cáo doanh thu',
        component: IncomReport,
        accessKey: MENU_ACCESS_KEY.incomeReport,
      },
      {
        path: '/doi-tac',
        key: 'bao-cao-doanh-thu-doi-tac',
        name: 'Báo cáo doanh thu đối tác',
        component: PartnerIcomeReport,
        accessKey: MENU_ACCESS_KEY.partnerReport,
      },
    ],
  },
  {
    path: '/quan-ly-dich-vu',
    key: 'quan-ly-dich-vu',
    name: 'Quản lý dịch vụ',
    icon: RiCustomerServiceFill,
    accessKey: MENU_ACCESS_KEY.serviceManage,
    children: [
      {
        path: '/dich-vu',
        key: 'dich-vu',
        name: 'Dịch vụ',
        component: ServiceList,
        accessKey: MENU_ACCESS_KEY.service,
        children: [
          {
            path: '/chi-tiet',
            key: 'chi-tiet',
            hidden: true,
            name: 'Dịch vụ',
            component: ServiceDetails,
            accessKey: MENU_ACCESS_KEY.service,
          },
        ],
      },
      {
        path: '/quang-cao',
        key: 'quang-cao',
        name: 'Quảng cáo',
        component: AdvertismentManagement,
        accessKey: MENU_ACCESS_KEY.advertisement,
        children: [
          {
            path: '/them-moi',
            key: 'them-moi',
            name: 'Quảng cáo',
            hidden: true,
            component: AdvertismentAddNew,
            accessKey: MENU_ACCESS_KEY.createAdvertisement,
          },
          {
            path: '/chi-tiet',
            key: 'chi-tiet',
            name: 'Quảng cáo',
            hidden: true,
            component: AdvertismentDetail,
            accessKey: MENU_ACCESS_KEY.advertisement,
          },
        ],
      },
      {
        path: '/khuyen-mai',
        key: 'khuyen-mai',
        name: 'Chương trình khuyến mại',
        accessKey: MENU_ACCESS_KEY.promotion,
        component: PromotionManagement,
        children: [
          {
            path: '/them-moi',
            key: 'them-moi',
            name: 'Chương trình khuyến mại',
            hidden: true,
            component: PromotionAddNew,
            accessKey: MENU_ACCESS_KEY.createPromotion,
          },
          {
            path: '/chi-tiet',
            key: 'chi-tiet',
            name: 'Chương trình khuyến mại',
            hidden: true,
            component: PromotionDetail,
            accessKey: MENU_ACCESS_KEY.promotion,
          },
        ],
      },
    ],
  },
  {
    path: '/quan-ly-he-thong',
    key: 'quan-ly-he-thong',
    name: 'Quản lý hệ thống',
    icon: AiFillSetting,
    accessKey: MENU_ACCESS_KEY.systemManage,
    children: [
      {
        path: '/loai-khach-hang',
        key: 'loai-khach-hang',
        name: 'Loại khách hàng',
        component: GuestType,
        accessKey: MENU_ACCESS_KEY.guestType,
      },
      {
        path: '/trang-chu',
        key: 'trang-chu',
        name: 'Cấu hình trang chủ',
        component: HomePageSettings,
        accessKey: MENU_ACCESS_KEY.homeSettings,
      },
      {
        path: '/chiet-khau-doi-tac',
        key: 'chiet-khau-doi-tac',
        name: 'Chiết khấu đối tác',
        component: PartnerDiscountSettings,
        accessKey: MENU_ACCESS_KEY.partnerDiscount,
        children: [
          {
            path: '/them-moi',
            key: 'them-moi',
            hidden: true,
            name: 'Đối tác',
            component: AddNewProgramDiscount,
            accessKey: MENU_ACCESS_KEY.createPartnerDiscount,
          },
          {
            path: '/chi-tiet',
            key: 'chi-tiet',
            hidden: true,
            name: 'Đối tác',
            component: DetailProgramDiscount,
            accessKey: MENU_ACCESS_KEY.partnerDiscount,
          },
        ],
      },
      {
        path: '/thue-phi',
        key: 'thue-phi',
        name: 'Cài đặt thuế, phí',
        component: TaxAndFeeSetting,
        accessKey: MENU_ACCESS_KEY.taxSettings,
      },
      {
        path: '/hop-dong',
        key: 'hop-dong',
        name: 'Loại hợp đồng',
        component: ContractManagement,
        accessKey: MENU_ACCESS_KEY.contract,
        children: [
          {
            path: '/them-moi',
            key: 'them-moi',
            hidden: true,
            name: 'Loại hợp đồng',
            component: ContractAddNew,
            accessKey: MENU_ACCESS_KEY.createContract,
          },
          {
            path: '/chi-tiet',
            key: 'chi-tiet',
            hidden: true,
            name: 'Loại hợp đồng',
            component: ContractDetail,
            accessKey: MENU_ACCESS_KEY.contract,
          },
        ],
      },
      {
        path: '/chat',
        key: 'chat',
        name: 'Chat/ cuộc gọi',
        component: ChatNCallLogs,
        accessKey: MENU_ACCESS_KEY.chatCall,
        children: [
          {
            path: '/chi-tiet',
            key: 'chi-tiet',
            hidden: true,
            name: 'Chi tiết chat',
            component: ChatnCallLogsDetails,
            accessKey: MENU_ACCESS_KEY.chatCall,
          },
        ],
      },
      {
        path: '/lien-he',
        key: 'lien-he',
        name: 'Thông tin liên hệ',
        component: ContactInfo,
        accessKey: MENU_ACCESS_KEY.contact,
      },
    ],
  },
  {
    path: '/thong-bao',
    key: 'thong-bao',
    name: 'Gửi thông báo',
    icon: MdNotificationsActive,
    component: AdminNotiList,
    accessKey: MENU_ACCESS_KEY.notification,
    children: [
      {
        path: '/them-moi',
        key: 'them-moi',
        hidden: true,
        name: 'Thêm mới thông báo',
        component: AdminNotiCreation,
        accessKey: MENU_ACCESS_KEY.createNotification,
      },
      {
        path: '/chi-tiet',
        key: 'chi-tiet',
        hidden: true,
        name: 'Chi tiết thông báo',
        component: AdminNotiDetails,
        accessKey: MENU_ACCESS_KEY.notification,
      },
    ],
  },
  {
    path: '/thong-bao-he-thong',
    key: 'thong-bao-he-thong',
    hidden: true,
    name: 'Thông báo',
    icon: MdNotificationsActive,
    component: SystemNotificationList,
  },
  {
    path: '/chat',
    key: 'chat',
    hidden: true,
    name: 'Chat',
    component: ChatPage,
  },
]

export default routes
