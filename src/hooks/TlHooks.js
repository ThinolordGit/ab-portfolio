
function usePublicUri(uri="") {
    return process.env.PUBLIC_URL+(uri.startsWith("/") ? `${uri}` : `/${uri}`);
}

export {usePublicUri};