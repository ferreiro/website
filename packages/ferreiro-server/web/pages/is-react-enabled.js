export const isReactEnabled = (req, processEnv) => (
    processEnv.ENABLE_REACT === 'true' ||
    req.query.react == 'true'
)