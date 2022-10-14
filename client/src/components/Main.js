import React, {useEffect, useState} from 'react';
import Nav from "./Nav";
import Modal from './Modal';

const Main = ({socket}) => {
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [showModal, setShowModal] = useState(false);
	const [selectedItemID, setSelectedItemID] = useState("");

    // Generate random string as TODO ID
    const generateID = () => Math.random().toString(36).substring(2, 10);

    const handleAddTodo = e => {
        e.preventDefault();
        socket.emit("addTodo", {
            id: generateID(),
            todo,
            comments: [],
        })
        setTodo('');
    };

    const deleteTodo = (id) => socket.emit('deleteTodo', id);

    const toggleModal = (itemId) => {
        socket.emit('viewComments', itemId);
        setSelectedItemID(itemId);
        setShowModal(!showModal);
    }

    useEffect(() => {
        const fetchTodo = async() => {
            fetch("http://localhost:4000/api/").then((res) => res.json()).then((data) => setTodoList(data)).catch((err) => console.log(err))
        }
        fetchTodo()
        socket.on("todos", (data) => setTodoList(data))
    }, [socket]);

    return(
        <div>
            <Nav />
            <form className='form' onSubmit={handleAddTodo}>
                <input 
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    className='input'
                    required
                />
                <button className='form__cta'>ADD TODO</button>
            </form>
            <div className='todo__container'>
                {todoList.map((item) => (
                <div className='todo__item' key={item.id}>
                    <p>{item.todo}</p>
                    <div>
                        <button className='commentsBtn' onClick={() => toggleModal(item.id)}>View Comments</button>
                        <button className='deleteBtn' onClick={() => deleteTodo(item.id)}>DELETE</button>
                    </div>
                </div>
                ))}
            </div>
            {showModal ? (
                <Modal showModal={showModal}
					setShowModal={setShowModal}
					selectedItemID={selectedItemID}
					socket={socket} />
            ) : (
                ""
            )}
        </div>
    );
}

export default Main;