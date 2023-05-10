import OneSignal from 'react-onesignal'

export default async function runOneSignal() {
  await OneSignal.init({
    appId: `${import.meta.env.VITE_ONESIGNAL_ADMIN_APP_KEY}`,
    // appId: `1375ed97-7f3d-4225-9535-884c4a2391d6`,
  })
}
