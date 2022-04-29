import Layout from '../components/Layout'
import {
  ChevronDownIcon,
  PlusIcon,
  DotsVerticalIcon,
  PlusCircleIcon,
} from '@heroicons/react/outline'
import CardItem from '../components/CardItem'
import BoardData from '../data/board-data.json'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { KeyboardEvent, useEffect, useState } from 'react'

function createGuidId() {
  return Math.random()
}

export default function Home() {
  const [ready, setReady] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [selectedBoard, setSelectedBoard] = useState(0)
  const [newBoard, setNewBoard] = useState(BoardData)

  //clonar array, adicionar campo

  useEffect(() => {
    if (process.browser) {
      setReady(true)
    }
  }, [])

  const onDragEnd = (re: any) => {
    if (!re.destination) return
    let newBoardData = newBoard
    var dragItem =
      newBoardData[parseInt(re.source.droppableId)].items[re.source.index]
    newBoardData[parseInt(re.source.droppableId)].items.splice(
      re.source.index,
      1
    )
    newBoardData[parseInt(re.destination.droppableId)].items.splice(
      re.destination.index,
      0,
      dragItem
    )
    setNewBoard(newBoardData)
  }

  const onTextAreaKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == 'Enter') {
      //Enter
      const val = e.currentTarget.value
      if (val.length === 0) {
        setShowForm(false)
      } else {
        let dataId = (e.target as Element).attributes.getNamedItem('data-id')
        const boardId = dataId && Number(dataId.value)

        if (boardId !== null) {
          const item = {
            id: createGuidId(),
            title: val,
            priority: 0,
            chat: 0,
            attachment: 0,
            assignees: [],
          }
          let newBoardData = newBoard
          newBoardData[boardId].items.push(item)
          setNewBoard(newBoardData)
          setShowForm(false)
          e.currentTarget.value = ''
        }
      }
    }
  }

  function CreateNewBoard() {
    const board = {
      name: 'New Board',
      items: [],
    }
    var boardNew = newBoard.concat(board)

    setNewBoard(boardNew)
    console.log('test')
  }

  return (
    <Layout>
      <div className="GeneralAreaKanbanContent">
        {/* Board hfunctioneader */}
        <div className="GeneralKanbanHeader">
          <div className="HeaderTextArea">
            <h4 className="">Studio Board</h4>
            <ChevronDownIcon className="SetaBaixoIconHeaderTitle" />
          </div>

          <ul className="CreateNewColumnList">
            <li>{/*imagem*/}</li>
            <li>{/*imagem*/}</li>
            <li>{/*imagem*/}</li>
            <li>
              <button onClick={() => CreateNewBoard()} className="">
                <PlusIcon className="IconeMaisCreateNewBoard" />
              </button>
            </li>
          </ul>
        </div>

        {/* Board columns*/}
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="BoardCollumGeneral">
              {newBoard.map((board, bIndex) => {
                return (
                  <div key={board.name}>
                    <Droppable droppableId={bIndex.toString()}>
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <div
                            className={`CollumGeneralArea
                            ${snapshot.isDraggingOver && 'GreenColor'}`}
                          >
                            <span className="RedLineCollum"></span>

                            <h4 className="TitleBoardArea">
                              <span className="BoardName">{board.name}</span>
                              <DotsVerticalIcon className="DotsVerticalIcon" />
                            </h4>

                            <div
                              className="CardAreaInCollum"
                              style={{ maxHeight: 'calc(100vh - 290px)' }}
                            >
                              {board.items.length > 0 &&
                                board.items.map((item, iIndex) => {
                                  return (
                                    <CardItem
                                      key={item.id}
                                      data={item}
                                      index={iIndex}
                                      className="CardItemClass"
                                    />
                                  )
                                })}
                              {provided.placeholder}
                            </div>

                            {showForm && selectedBoard === bIndex ? (
                              <div className="AroundTextAreaAddTask">
                                <textarea
                                  className=""
                                  rows={3}
                                  placeholder="Task info"
                                  data-id={bIndex}
                                  onKeyDown={(e) => onTextAreaKeyPress(e)}
                                />
                              </div>
                            ) : (
                              <button
                                className="ButtonAddTask"
                                onClick={() => {
                                  setSelectedBoard(bIndex)
                                  setShowForm(true)
                                }}
                              >
                                <span>Add task</span>
                                <PlusCircleIcon className="PlusCircleIcon" />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </Droppable>
                  </div>
                )
              })}
            </div>
          </DragDropContext>
        )}
      </div>
    </Layout>
  )
}
