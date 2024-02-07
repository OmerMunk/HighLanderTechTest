export const getGoogleMapsAPIKeyHandler = () => {
    // todo: would store it in secrets
    return {
        success: true,
        key: process.env._GOOGLE_MAPS_API_KEY || 'AIzaSyCdtGPc2gg0Wh8UWRWDGDy8ChwLNyB5DnI'

    }
}