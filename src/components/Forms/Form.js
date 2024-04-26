import { useRef, useContext, useState, useEffect } from "react";
import List from "../List/List";
import ListContext from "../../../utils/contexts/ListsContext";

const Form = () => {
    const { data, setAppData } = useContext(ListContext);

    const [editState, setEditState] = useState(false);

    let titleRef = useRef(null);
    let contentRef = useRef(null);

    let indexRef = useRef(null);

    const addData = () => {
        try {
            if (titleRef.current && contentRef.current) {
                if (editState) {
                    data[indexRef.current].title = titleRef.current;
                    data[indexRef.current].content = contentRef.current;

                    setAppData([...data]);
                } else {
                    const obj = { title: titleRef.current, content: contentRef.current };

                    setAppData([obj, ...data]);
                }
            } else {
                throw new Error("Enter both title & content");
            }
        } catch (err) {
            if (editState) {
                setEditState(false);
            }

            alert(err);
            return;
        } finally {
            inputFieldProp(null, null);
        }
    };

    const editData = (value, index) => {
        indexRef.current = index;
        inputFieldProp(value.title, value.content);
        setEditState(true);
    };

    const deleteData = (index) => {
        data.splice(index, 1);

        setAppData([...data]);
    };

    const inputFieldProp = (title, content) => {
        document.querySelectorAll(".title")[0].value = title ? title : "";
        document.querySelectorAll(".content")[0].value = content ? content : "";

        titleRef.current = title;
        contentRef.current = content;
    };

    useEffect(() => {
        if (editState && titleRef.current === null && contentRef.current === null) {
            setEditState(false);
        }
    }, []);

    const layout = (
        <div>
            <input
                type="text"
                className="title"
                placeholder="Title"
                onChange={(e) => {
                    titleRef.current = e.target.value;
                }}
            />

            <input
                type="text"
                className="content"
                placeholder="Content"
                onChange={(e) => {
                    contentRef.current = e.target.value;
                }}
            />

            <button
                onClick={() => {
                    addData();
                }}>
                {editState ? "Update" : "Add+"}
            </button>

            <List edits={editData} deletes={deleteData} />
        </div>
    );

    return layout;
};

export default Form;
