import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const TagsToAdd = ({ tags }) => {
    return (
        <TransitionGroup className="tags_to_add">
            {
                
                tags.map((tag, index) => {
                    return (
                        <CSSTransition key={index} classNames={'tag'} timeout={400} unmountOnExit>
                            <span className="tag_to_add">{tag}</span>
                        </CSSTransition>
                    )
                })
            }
        </TransitionGroup>
    )
}

export default TagsToAdd
