/*
 * @Author: fightWz
 * @Date: 2020-04-27 15:24:07
 * @LastEditors: fightWz
 * @LastEditTime: 2020-10-31 14:26:21
 * @Description: api
 */
import mock from '@/assets/mock/mock'
import http from './http'
let baseURL
if (location.hostname === 'localhost' || location.hostname.indexOf('192') !== -1) {
  baseURL = process.env.VUE_APP_BASEURL_LOC
} else if (location.hostname.indexOf('bims.langyaapp') !== -1) {
  baseURL = process.env.VUE_APP_BASEURL_PROD
} else if (location.hostname.indexOf('bims.release') !== -1) {
  baseURL = process.env.VUE_APP_BASEURL_DEV
} else if (location.hostname.indexOf('47.98.162.11') !== -1) {
  baseURL = 'http://47.98.162.11:5053'
}
// 登录
export const login = data => http('/api/auth/login', 'post', data)
// 修改密码
export const editPassword = data => http('/api/auth/resetsPasswords', 'post', data)
// 退出登录
export const logOut = data => http('/api/auth/logout', 'post', data)
// 登录用户菜单
export const getAdminMenu = data => http('/api/admin/menu', 'get', data)

// 概况统计-统计总数
export const getSurveyStat = data => http('/api/stat/stat', 'get', data)
// 概况统计-用户注册统计
export const getSurveyStatUser = data => http('/api/stat/user', 'get', data)
// 概况统计-会员数
export const getSurveyStatVip = data => http('/api/stat/vip', 'get', data)
// 概况统计-活跃用户统计
export const getSurveyStatActive = data => http('/api/stat/active', 'get', data)
// 概况统计-广场动态
export const getSurveyStatDynamic = data => http('/api/stat/dynamic', 'get', data)
// 概况统计-充值金额
export const getSurveyStatOrder = data => http('/api/stat/order', 'get', data)
// 概况统计-消费金额
export const getSurveyStatPay = data => http('/api/stat/pay', 'get', data)
// 用户统计
export const getUserStatistics = data => http('/api/stat/user-total', 'get', data)
// 用户-会员统计
export const getVipStatistics = data => http('/api/stat/vip-pay', 'get', data)
// 充值统计
export const getOrderLanghua = data => http('/api/stat/order-langhua', 'get', data)
// 提现统计
export const getWithdrawal = data => http('/api/stat/withdrawal', 'get', data)
// 消费统计
export const getPayLanghua = data => http('/api/stat/pay-langhua', 'get', data)
// 广场统计
export const getSquare = data => http('/api/stat/square', 'get', data)
// 消费详情-红包(红包相册和视频)
export const getRedPhoto = data => http('/api/stat/red', 'get', data)
// 消费详情-社交账号和私聊
export const getRedSocial = data => http('/api/stat/limit', 'get', data)
// 消费详情-发布活动
export const getRedUserActivity = data => http('/api/stat/user-activity', 'get', data)
// 消费详情-发布活动
export const getRedUserDynamic = data => http('/api/stat/user-dynamic', 'get', data)

// 用户管理-工作台-用户统计
export const getUserWorkbench = data => http('/api/stat/user-workbench', 'get', data)
// 用户管理-工作台-用户地区统计
export const getUserRegion = data => http('/api/stat/region-user', 'get', data)
// 用户管理-工作台-付费用户
export const getOrderRegion = data => http('/api/stat/region-order', 'get', data)

// 用户管理-用户列表
export const getUserList = data => http('/api/user/list', 'get', data)
// 用户管理-用户列表导出
export const usersExcel = `${baseURL}/api/excel/users`
// 用户管理-用户详情
export const getUserInfo = data => http(`/api/user/info/${data.id}`, 'get', data)
// 用户管理-虚拟用户新增枚举
export const getUserEnum = data => http('/api/user/enum', 'get', data)
// 用户管理-虚拟用户新增
export const addOperateUser = data => http('/api/user/operate-user', 'upload', data)
// 用户管理-虚拟用户编辑
export const editOperateUser = data => http(`/api/user/operate-user/${data.id}`, 'put', data, 'form')
// 用户管理-虚拟用户头像编辑
export const editOperateUserAvatar = data => http(`/api/user/operate-avatar/${data.id}`, 'upload', data)
// 用户管理-虚拟用户导入
export const importOperateUser = data => http('/api/user/import', 'upload', data)
// 用户管理-虚拟用户删除
export const delOperateUser = data => http('/api/user/operate-user', 'delete', data)
// 用户管理-虚拟真人认证
export const realIdentification = data => http('/api/user/real-identification', 'upload', data, 'form')
// 用户管理-虚拟女神认证
export const expertIdentification = data => http(`/api/user/expert-identification/${data.id}`, 'PUT', data)
// 用户管理-用户列表-粉丝列表
export const getFansList = data => http(`/api/user/fans-list/${data.id}`, 'get', data)
// 用户管理-用户列表-删除粉丝
export const delFans = data => http(`/api/user/fans/${data.id}`, 'delete', data)
// 用户管理-用户列表-黑粉列表
export const getBlackFansList = data => http(`/api/user/blacklist/${data.id}`, 'get', data)
// 用户管理-用户列表-删除黑粉
export const delBlackFans = data => http(`/api/user/blacklist/${data.id}`, 'delete')
// 用户管理-用户列表-冻结账户状态
export const putUserFrozen = data => http(`/api/user/frozen/${data.id}`, 'put', data)
// 用户管理-用户列表-批量上下线
export const putUserLog = data => http('/api/user/user-log', 'put', data)
// 虚拟用户-补充信息
export const putUserAuxiliary = data => http(`/api/user/auxiliary/${data.id}`, 'put', data)

// 用户管理-banner管理列表
export const getBanner = data => http('/api/operate/banner', 'get', data)
// 用户管理-banner管理新增
export const addBanner = data => http('/api/operate/banner', 'post', data)
// 用户管理-banner管理编辑
export const editBanner = data => http(`/api/operate/banner/${data.id}`, 'put', data)
// 用户管理-用户在线切换
export const editUserOnline = data => http(`/api/user/operate-user/${data.id}`, 'put', data)
// 用户管理-banner管理删除
export const delBanner = data => http(`/api/operate/banner/${data.id}`, 'delete')
// 用户管理-开通vip
export const addUserVip = data => http('/api/user/operate-edit', 'put', data, 'form')

// 用户管理-虚拟用户token
export const getVirtualToken = data => http('/api/user/virtual-token', 'get', data)

// 运营管理-充值设置列表
export const getCoinSuit = data => http('/api/operate/coin_suit', 'get', data)
// 运营管理-充值设置新增
export const addCoinSuit = data => http('/api/operate/coin_suit', 'post', data)
// 运营管理-充值设置编辑
export const editCoinSuit = data => http(`/api/operate/coin_suit/${data.id}`, 'put', data, 'form')
// 运营管理-充值设置删除
export const delCoinSuit = data => http(`/api/operate/coin_suit/${data.id}`, 'delete', data)
// 运营管理-vip套餐设置列表
export const getVipSuit = data => http('/api/operate/vip_suit', 'get', data)
// 运营管理-vip套餐设置新增
export const addVipSuit = data => http('/api/operate/vip_suit', 'post', data)
// 运营管理-vip套餐设置编辑
export const editVipSuit = data => http(`/api/operate/vip_suit/${data.id}`, 'put', data, 'form')
// 运营管理-vip套餐设置删除
export const delVipSuit = data => http(`/api/operate/vip_suit/${data.id}`, 'delete', data)
// 运营管理-红包设置列表
export const getOperateSet = data => http('/api/operate/setting', 'get', data)
// 运营管理-红包设置编辑
export const editOperateSet = data => http(`/api/operate/setting/${data.id}`, 'put', data, 'form')
// 运营管理-提现与审核列表
export const getWithdraw = data => http('/api/finance/withdraw', 'get', data)
// 运营管理-提现审核
export const putWithdraw = data => http(`/api/finance/withdraw/${data.id}`, 'put', data)
// 运营管理-女神认证列表
export const getPhotoExpert = data => http('/api/content/photo-expert', 'get', data)
// 运营管理-女神女神审核
export const putPhotoExpert = data => http(`/api/content/photo-expert/${data.id}`, 'put', data)
// 运营管理-消息管理-虚拟用户列表
export const getOperateChat = data => http('/api/operate/chat', 'get', data)
// 运营管理-消息管理-真实用户列表
export const getChatUserList = data => http('/api/user/default-list', 'get', data)
// 运营管理-活动列表
export const getActivities = data => http('/api/content/activities', 'get', data)
// 运营管理-添加活动
export const postActivities = data => http('/api/content/activities', 'post', data, 'form')
// 运营管理-活动删除
export const delActivities = data => http(`/api/content/activities/${data.id}`, 'delete', data)
// 运营管理-活动删除
export const putActivities = data => http(`/api/content/activities/${data.id}`, 'put', data)
// 运营管理-活动报名人数
export const getApplyList = data => http('/api/content/activity-apply-list', 'get', data)
// 动态评论-随机点赞
export const randomZan = data => http('/api/content/dynamic-random-zan', 'post', data)
// 动态的评论-树形
export const getDynamicComments = data => http('/api/content/dynamics-comments', 'get', data)
// 内容管理-动态评论
export const dynamicComment = data => http('/api/content/dynamic-comment', 'post', data)

// 客服聊天-聊天组列表
export const getChatGroup = data => http('/api/admin/group', 'get', data)
// 客服聊天-添加聊天组
export const addChatGroup = data => http('/api/admin/group', 'post', data)
// 客服聊天-编辑聊天组
export const editChatGroup = data => http(`/api/admin/group/${data.id}`, 'put', data, 'form')
// 客服聊天-删除聊天组
export const delChatGroup = data => http(`/api/admin/group/${data.id}`, 'delete', data)
// 客服聊天-虚拟用户-绑定聊天组
export const addUserRelation = data => http('/api/user/relation', 'post', data)
// 客服聊天-当前管理员聊天组
export const getAdminChatGroup = data => http('/api/admin/chat-group', 'get', data)
// 客服聊天-聊天历史记录
export const getChatHistory = data => http('/api/operate/chat-history', 'get', data)

// 内容管理-动态管理列表
export const getDynamicsList = data => http('/api/content/dynamics-list', 'get', data)
// 内容管理-动态管理新增
export const addDynamics = data => http('/api/content/dynamics', 'post', data)
// 内容管理-动态删除
export const delDynamics = data => http(`/api/content/dynamics/${data.id}`, 'delete', data)
// 内容管理-动态状态
export const putDynamics = data => http(`/api/content/dynamics/${data.id}`, 'put', data)
// 内容管理-动态点赞
export const dynamicZan = data => http('/api/content/dynamic-zan', 'post', data)
// 内容管理-评论管理列表
export const getCommentsList = data => http('/api/content/comments-list', 'get', data)
// 内容管理-评论屏蔽
export const delComments = data => http(`/api/content/comments/${data.id}`, 'delete', data)

// 用户-相册列表
export const getPhotoList = data => http('/api/content/photo-list', 'get', data)
// 用户-相册新增
export const addPhoto = data => http('/api/content/photo', 'post', data)
// 用户-相册删除
export const delPhoto = data => http(`/api/content/photo/${data.id}`, 'delete', data)
// 用户-相册状态设置
export const putPhotoStatus = data => http(`/api/content/photo/${data.id}`, 'put', data)
// 用户-红包相册设置
export const setRedAlbum = data => http('/api/content/red-album', 'post', data)
// 用户-红包相册删除
export const delRedAlbum = data => http(`/api/content/red-album/${data.id}`, 'delete', data)

// 内容管理-资源审核列表
export const getResources = data => http('/api/content/resources', 'get', data)
// 内容管理-资源审核屏蔽
export const putResourcesShield = data => http(`/api/content/shield/${data.id}`, 'put', data)

// 线下渠道统计-渠道用户列表
export const getChannelUserList = data => http('/api/operate/channel-list', 'get', data)
// 线下渠道统计-渠道统计列表
export const getChannelList = data => http('/api/operate/channel-stat', 'get', data)
// 线下渠道统计-渠道统计-提现记录
export const financeWithdraw = data => http('/api/finance/withdraw', 'get', data)
// 线下渠道统计-渠道统计-渠道下级
export const getchannelNext = data => http('/api/operate/channel-next', 'get', data)
// 线下渠道统计-渠道统计-渠道下下级
export const getchannelSeptum = data => http('/api/operate/channel-septum', 'get', data)
// 线下渠道统计-渠道统计-渠道金额统计
export const getchannelDeserve = data => http('/api/operate/channel-deserve', 'get', data)
// 线下渠道统计-渠道设置列表
export const getChannelSet = data => http('/api/operate/channel-setting', 'get', data)
// 线下渠道统计-渠道设置编辑
export const editChannelSet = data => http(`/api/operate/channel-setting/${data.index}`, 'put', data, 'form')
// 线下渠道统计-渠道审核列表
export const getChannelExamine = data => http('/api/operate/channel-examine', 'get', data)
// 线下渠道统计-渠道审核操作
export const editChannelExamine = data => http(`/api/operate/channel-examine/${data.id}`, 'put', data, 'form')
// 线下渠道统计-渠道绑定列表
export const getChannelInfo = data => http('/api/operate/channel-info', 'get', data)
// 线下渠道统计-渠道解绑
export const unbundleChannelBind = data => http(`/api/operate/channel-bind/${data.id}`, 'delete', data)
// 线下渠道统计-渠道绑定
export const bundleChannelBind = data => http('/api/operate/channel-bind', 'post', data)
export const withdrawExcel = `${baseURL}/api/excel/withdraw`
// 下级导出
export const channelNextExcel = `${baseURL}/api/excel/channel-next`
// 下下级导出
export const channelSeptumExcel = `${baseURL}/api/excel/channel-septum`
// 提现审核导出
export const channelExamineExcel = `${baseURL}/api/excel/channel-examine`
// 线下渠道统计-BD管理列表
export const getBDList = data => http('/api/market/bd-list', 'get', data)
// 线下渠道统计-BD管理新增
export const addBD = data => http('/api/market/bd', 'post', data)
// 线下渠道统计-BD绑定用户列表
export const getBDUser = data => http('/api/market/bd-user', 'get', data)
// 线下渠道统计-BD绑定用户新增
export const addBDUser = data => http('/api/market/bd-user', 'post', data)
// 线下渠道统计-BD绑定用户解绑
export const unBindBDUser = data => http(`/api/market/bd-user/${data.id}`, 'delete', data)
// 线下渠道统计-BD管理状态
export const editBDStatus = data => http(`/api/market/bd-disable/${data.id}`, 'put', data)
// 线下渠道统计-渠道商管理列表
export const getMerchantList = data => http('/api/market/merchant', 'get', data)
// 线下渠道统计-渠道商管理新增
export const addMerchant = data => http('/api/market/merchant', 'post', data, 'form')
// 线下渠道统计-渠道商管理修改
export const editMerchant = data => http(`/api/market/merchant/${data.id}`, 'put', data)
// 线下渠道统计-渠道商管理-核销记录
export const getMerchantCoupon = data => http('/api/market/coupon', 'get', data)

// 系统管理-反馈&建议列表
export const getFeedbackList = data => http('/api/sys/feedback-list', 'get', data)
// 系统管理-反馈&建议标记已读
export const signFeedback = data => http(`/api/sys/feedback/${data.id}`, 'put', data, 'form')
// 系统管理-系统通知列表
export const getNoticeList = data => http('/api/sys/notice-list', 'get', data)
// 系统管理-系统通知新增
export const addNotice = data => http('/api/sys/notice', 'post', data)
// 系统管理-举报管理列表
export const getReportList = data => http('/api/sys/report-stat', 'get', data)
// 系统管理-举报管理冻结、恢复
export const reportUser = data => http(`/api/sys/report-user/${data.id}`, 'put', data)
// 系统管理-举报管理-被举报记录列表
export const getReportUserList = data => http(`/api/sys/report-list/${data.id}`, 'get', data)

// 财务管理-充值记录列表
export const getOrderList = data => http('/api/finance/order-list', 'get', data)
// 财务管理-充值记录总计
export const getOrderTotal = data => http('/api/finance/order-total', 'get', data)
// 财务管理-充值记录导出
export const getExlOrder = `${baseURL}/api/excel/order`

// 财务管理-交易账单列表
export const getUserPayList = data => http('/api/finance/user-pay-list', 'get', data)
// 财务管理-交易账单总计
export const getUserPayTotal = data => http('/api/finance/user-pay-total', 'get', data)
// 财务管理-收入记录列表
export const getIncomeList = data => http('/api/finance/income', 'get', data)

// 客服管理-问题设置列表
export const getAutoReply = data => http('/api/operate/auto-reply', 'get', data)
// 客服管理-问题设置新增
export const addAutoReply = data => http('/api/operate/auto-reply', 'post', data)
// 客服管理-问题设置编辑
export const editAutoReply = data => http(`/api/operate/auto-reply/${data.id}`, 'put', data, 'form')
// 客服管理-问题设置删除
export const delAutoReply = data => http(`/api/operate/auto-reply/${data.id}`, 'delete', data)
// 客服管理-留言回复
export const getGuestBook = data => http('/api/sys/guestbook-stat', 'get', data)
// 客服管理-留言回复详情
export const getGuestBookInfo = data => http(`/api/sys/guestbook/${data.id}`, 'get', data)
// 客服管理-留言回复-回复
export const addGuestBook = data => http('/api/sys/guestbook', 'post', data)
// 客服管理-留言回复-回复
export const putGuestbook = data => http(`/api/sys/guestbook/${data.id}`, 'put')
// 客服管理-留言回复-全部标记
export const putAllGuestbook = data => http('/api/sys/guestbook', 'put', data)

// 渠道商管理-渠道概况统计
export const getSummarieStat = data => http('/api/operate/summarie-stat', 'get', data)
// 渠道商管理-数据报表列表
export const getSummarieList = data => http('/api/operate/summarie', 'get', data)
// 渠道商管理-数据报表导入
export const importOperateSummarie = data => http('/api/operate/summarie-import', 'upload', data)

// 直播管理-工作台-火力榜
export const getGiveStatUnion = data => http('/api/live/give-stat-union', 'get', data)
// 直播管理-工作台-收入浪花
export const getProfitStatUnion = data => http('/api/live/profit-stat-union', 'get', data)
// 直播管理-工作台-直播时长
export const getDurationStatUnion = data => http('/api/live/duration-stat-union', 'get', data)

// 直播管理-公会管理列表
export const getLiveUnionList = data => http('/api/live/union', 'get', data)
// 直播管理-公会管理新增
export const addLiveUnion = data => http('/api/live/union', 'post', data)
// 直播管理-公会管理编辑
export const editLiveUnion = data => http(`/api/live/union/${data.id}`, 'put', data)
// 直播管理-公会删除
export const delLiveUnion = data => http(`/api/live/union/${data.id}`, 'delete', data)

// 公会工作台-正在直播主播
export const getHostLiveStatList = data => http('/api/live/host-living-stat', 'get', data)
// 公会工作台-正在直播主播-直播地址获取
export const getLiveUrl = data => http('/api/live/url', 'get', data)
// 公会工作台-公会统计
export const getUnionStat = data => http('/api/live/union-stat', 'get', data)
// 公会工作台-正在直播主播封面禁用
export const putLiveCover = data => http(`api/live/live-update/${data.id}`, 'put', data)

// 公会主播-列表
export const getHostStatList = data => http('/api/live/host-stat', 'get', data)
// 公会主播-数据明细-统计
export const getLiveStat = data => http('/api/live/live-stat', 'get', data)
// 公会主播-数据明细-礼物明细
export const getGiftLog = data => http('/api/live/gift-log', 'get', data)
// 公会主播-数据明细-直播时长
export const getDurationList = data => http('/api/live/duration-list', 'get', data)

// 公会数据报表-经营分析统计
export const getUnionStatTotal = data => http('/api/live/union-stat-total', 'get', data)
// 公会数据报表-经营分析
export const getUnionStatDate = data => http('/api/live/union-stat-date', 'get', data)
// 公会数据报表-直播数据
export const getHostLiveStat = data => http('/api/live/host-live-stat', 'get', data)
// 公会数据报表-排行榜-主播榜
export const getProfitStat = data => http('/api/live/profit-stat', 'get', data)
// 公会数据报表-排行榜-土豪榜
export const getGiveStat = data => http('/api/live/give-stat', 'get', data)

// 直播管理-主播管理列表
export const getLiveHostList = data => http('/api/live/host', 'get', data)
// 直播管理-主播管理审核
export const putLiveHost = data => http(`/api/live/host/${data.id}`, 'put', data)
// 直播管理-主播绑定公会
export const bindUnion = data => http(`/api/live/bind-union/${data.id}`, 'put', data)
// 直播管理-主播列表-批量排序
export const putHostSort = data => http('/api/host/sort', 'put', data)

// 直播管理-主播招募列表
export const getCheckHostList = data => http('/api/check/host', 'get', data)
// 直播管理-家族入驻申请列表
export const getCheckUnionList = data => http('/api/check/union', 'get', data)

// 直播管理-礼物管理列表
export const getLiveGiftList = data => http('/api/live/gift', 'get', data)
// 直播管理-礼物管理新增
export const addLiveGift = data => http('/api/live/gift', 'post', data)
// 直播管理-礼物管理删除
export const delLiveGift = data => http(`/api/live/gift-status/${data.id}`, 'put', data, 'form')

// 直播管理-主播收益统计
export const getLiveProfitTotal = data => http('/api/live/profit-total', 'get', data)
// 直播管理-主播收益列表
export const getLiveProfitList = data => http('/api/live/profit-stat', 'get', data)
// 直播管理-主播收益详情
export const getLiveProfitDetails = data => http('/api/live/profit-list', 'get', data)

// 直播管理-直播时长统计
export const getLiveDurationTotal = data => http('/api/live/duration-total', 'get', data)
// 直播管理-直播时长列表
export const getLiveDurationList = data => http('/api/live/duration-stat', 'get', data)
// 直播管理-直播时长详情
export const getLiveDurationDetails = data => http('/api/live/duration-list', 'get', data)
// 直播管理-中奖统计
export const getLiveWheel = data => http('/api/live/wheel', 'get', data)
// 直播管理-转盘奖品列表
export const getLiveWheelGift = data => http('/api/live/wheel-gift', 'get', data)

// 应用设置-主播标签
export const getHostLabelList = data => http('/api/host/label', 'get', data)
// 应用设置-主播标签新增
export const addHostLabel = data => http('/api/host/label', 'post', data)
// 应用设置-主播标签修改
export const editHostLabel = data => http(`/api/host/label/${data.id}`, 'put', data, 'form')
// 应用设置-主播标签删除
export const delHostLabel = data => http(`/api/host/label/${data.id}`, 'delete', data)

// 权限设置-菜单管理列表
export const getMenuList = data => http('/api/menu', 'get', data)
// 权限设置-菜单管理修改
export const addAdminMenu = data => http('/api/menu', 'post', data)
// 权限设置-菜单管理修改
export const editAdminMenu = data => http(`/api/menu/${data.id}`, 'put', data, 'form')
// 权限设置-菜单管理删除
export const delAdminMenu = data => http(`/api/menu/${data.id}`, 'delete', data)
// 权限设置-角色管理列表
export const getAdminRole = data => http('/api/role', 'get', data)
// 权限设置-角色管理新增
export const addAdminRole = data => http('/api/role', 'post', data)
// 权限设置-角色管理编辑
export const editAdminRole = data => http(`/api/role/${data.id}`, 'put', data, 'form')
// 权限设置-角色管理删除
export const delAdminRole = data => http(`/api/role/${data.id}`, 'delete', data)
// 权限设置-角色管理权限新增
export const addPermission = data => http(`/api/permission/${data.id}`, 'post', data, 'form')
// 权限设置-管理员用户列表
export const getAdminUser = data => http('/api/admin/list', 'get', data)
// 权限设置-管理员用户新增
export const addAdminUser = data => http('/api/admin', 'post', data)
// 权限设置-管理员用户编辑
export const editAdminUser = data => http(`/api/admin/${data.id}`, 'put', data, 'form')
// 权限设置-管理员用户角色设置
export const editAssignedRole = data => http(`/api/assigned_role/${data.id}`, 'post', data, 'form')
// 权限设置-管理员用户删除
export const delAdminUser = data => http(`/api/admin/${data.id}`, 'delete', data)

// 获取七牛token
export const getToken = data => http('/api/content/getToken?drive=public', 'get', data)

// 获取聊天token
export const getChatToken = data => http('/api/content/getToken?drive=chat', 'get', data)

// 表格数据
export const tableData = () => mock.tableData()

// 留言消息未读数
export const getUnreadCount = data => http('/api/sys/guestbook-unread-count', 'get', data)

// 广告商数据(广告商管理)
export const getChannelTotal = data => http('/api/channel/total', 'get', data)
// 广告商数据折线用户(广告商管理)
export const getChannelUser = data => http('/api/channel/user', 'get', data)
// 广告商数据折线付费(广告商管理)
export const getChannelOrder = data => http('/api/channel/order', 'get', data)
// 广告商(广告商管理)
export const getChannelType = data => http('/api/channel/type', 'get', data)
// 广告商数据列表(广告商管理)
export const getStatlChannel = data => http('/api/channel/stat', 'get', data)

// 广告商列表(广告商管理)
export const getAdvertiserList = data => http('/api/channel/advertiser-list', 'get', data)
// 广告商列表-(添加)
export const postChannelAdvertiser = data => http('/api/channel/advertiser', 'post', data)
// 广告商列表-(删除)
export const delChannelAdvertiser = data => http(`/api/channel/advertiser/${data.id}`, 'delete', data)
// 广告商列表-广告商重置密码(广告商管理)
export const putChannelAdvertiser = data => http(`/api/channel/advertiser/${data.id}`, 'put', data)
// 广告商列表-广告商重置密码(广告商管理)
export const getChannelAPPType = data => http('/api/channel/app-type', 'get', data)

// 内容管理-工作台(总数)
export const getContentTotal = data => http('/api/stat/square-total', 'get', data)

// 内容管理-工作台(动态图表)
export const getContentDynamic = data => http('/api/stat/square-dynamic', 'get', data)
// 内容管理-工作台(评论图表)
export const getContentComment = data => http('/api/stat/square-comment', 'get', data)
// 内容管理-工作台(活动图表)
export const getContentActivity = data => http('/api/stat/square-activity', 'get', data)
// 内容管理-工作台(点赞图表)
export const getContentPraise = data => http('/api/stat/square-praise', 'get', data)
// 内容管理-工作台(活动报名图表)
export const getContentActivityApplyLog = data => http('/api/stat/square-activityApplyLog', 'get', data)
// 内容管理-工作台(热门动态)
export const getContentHotDynamic = data => http('/api/stat/hot-dynamic', 'get', data)
// 内容管理-工作台(热门活动)
export const getContentHotActivity = data => http('/api/stat/hot-activity', 'get', data)
// 财务管理 -合作方礼物明细
export const getLiveGiftLog = data => http('/api/live/gift-log', 'get', data)
// 财务管理 -合作方礼物明细导出
export const getLiveGiftLogExl = `${baseURL}/api/excel/gift-log`

// 直播管理-(违规提醒列表)
export const getLiveRemind = data => http('/api/live/remind', 'get', data)
// 直播管理-(主播封号列表)
export const getLiveUserForbid = data => http('/api/live/user-forbid', 'get', data)
// 直播管理-(直播禁播列表)
export const getLiveForbid = data => http('/api/live/live-forbid', 'get', data)
// 直播管理-(违规提醒)
export const postLiveForbid = data => http('/api/live/remind', 'post', data)
// 直播主播-封禁
export const liveForbid = data => http('/api/live/forbid', 'post', data)
// 应用设置-打招呼词库
export const getOperategreet = data => http('/api/operate/greet', 'get', data)
// 应用设置-打招呼词库
export const delOperategreet = data => http('/api/operate/greet', 'delete', data)
// 应用设置-打招呼词库
export const postOperategreet = data => http('/api/operate/greet', 'post', data)
// 应用设置-打招呼词库
export const getOperatekeyword = data => http('/api/operate/keyword', 'get', data)
// 应用设置-打招呼词库
export const delOperatekeyword = data => http('/api/operate/keyword', 'delete', data)
// 应用设置-打招呼词库
export const postOperatekeyword = data => http('/api/operate/keyword', 'post', data)
// 直播管理-主播开播时间段统计
export const getliveDurationStatHost = data => http('/api/live/duration-stat-host', 'get', data)
// 直播管理-主播开播时间段统计导出
export const getliveDurationStatHostExcel = `${baseURL}/api/excel/duration-stat-host`
// 直播管理-主播有效记录
export const getLivehostOperationLog = data => http('/api/live/host_operation_log', 'get', data)

// 广告商统计-(新)
export const getStatadStat = data => http('/api/stat/ad-stat', 'get', data)
// 广告商数据导出
export const exceladStat = `${baseURL}/api/excel/ad-stat`
