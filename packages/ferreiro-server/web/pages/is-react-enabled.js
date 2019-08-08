export const isReactEnabled = (req) => (
    process.env.ENABLE_REACT === 'true' ||
        req.query.react == 'true'
)