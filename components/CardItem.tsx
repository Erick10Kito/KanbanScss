import React from 'react'
import { PlusIcon, ChatAlt2Icon, PaperClipIcon } from '@heroicons/react/outline'
import { Draggable } from 'react-beautiful-dnd'

function CardItem({ data, index }: any) {
  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="AroundCardGeral"
        >
          <label
            className={`LabelPriorityCard
              ${
                data.priority === 0
                  ? 'LabelPriorityCardBlue'
                  : data.priority === 1
                  ? 'LabelPriorityCardGreen'
                  : 'LabelPriorityCardRed'
              }
              `}
          >
            {data.priority === 0
              ? 'Low Priority'
              : data.priority === 1
              ? 'Medium Priority'
              : 'High Priority'}
          </label>
          <h5 className="TitleCardItemText">{data.title}</h5>
          <div className="InsideAreaCard">
            <div className="AroundItensBottomCard">
              <span className="spanChatCard">
                <ChatAlt2Icon className="imgChatIcon" />
                <span>{data.chat}</span>
              </span>
              <span className="SpanAttachmentCard">
                <PaperClipIcon className="ImgAttachmentICon" />
                <span>{data.attachment}</span>
              </span>
            </div>

            <ul className="ListCardBottom">
              {data.assignees.map((index: React.Key | null | undefined) => {
                return <li key={index}>{/*imagem*/}</li>
              })}
              <li>
                <button className="ButtonListCardBottom">
                  <PlusIcon className="IconButtonListCardBottom" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default CardItem
