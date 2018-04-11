import Alert from 'react-s-alert'

export class AppSettings {
    public AlertSettings: any = {}
    public ApplicationName: string = 'ArragroCMS'
    public ManagementUriPrefix: string = ''

    public info (msg: string, data?: any): void {
        Alert.info(msg, data)
    }
    public error (msg: string, data?: any): void {
        Alert.error(msg, data)
    }
    public warning (msg: string, data?: any): void {
        Alert.warning(msg, data)
    }
    public success (msg: string, data?: any): void {
        Alert.success(msg, data)
    }
    public close (id: number): void {
        Alert.close(id)
    }
    public closeAll (): void {
        Alert.closeAll()
    }
}

const appSettings = new AppSettings()

export default appSettings
