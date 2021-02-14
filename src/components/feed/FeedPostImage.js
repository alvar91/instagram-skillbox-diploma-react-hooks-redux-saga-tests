import React from 'react'

export default function FeedPostImage({media, altDescription, classImage, handleOpenPostModal}) {
    return (
        <div>
          <img src={media} onClick={handleOpenPostModal} alt={altDescription} className={classImage} />
        </div>
    )
}
