import React from 'react'
import ContentLoader from 'react-content-loader'

export const PostLoader = () => (
    <ContentLoader 
      height={700}
      width={700}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="9" y="13" rx="4" ry="4" width="650" height="22" /> 
      <rect x="9" y="50" rx="4" ry="4" width="419" height="22" />
      <rect x="9" y="100" rx="4" ry="4" width="300" height="22" />
      <circle cx="26" cy="170" r="20" /> 
      <rect x="60" y="160" rx="4" ry="4" width="120" height="18" /> 
      <rect x="7" y="220" rx="5" ry="5" width="688" height="350" /> 
      <rect x="7" y="600" rx="5" ry="5" width="300" height="14" />
      <rect x="7" y="630" rx="5" ry="5" width="240" height="14" />
      <rect x="7" y="660" rx="5" ry="5" width="180" height="14" />
    </ContentLoader>
)
  