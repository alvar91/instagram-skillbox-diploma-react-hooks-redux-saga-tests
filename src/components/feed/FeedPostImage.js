import React from 'react'

export default function FeedPostImage({media, altDescription, classImage}) {
    return (
        <div>
          <img src={media} alt={altDescription} className={classImage} />
        </div>
    )
}
