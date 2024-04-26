import { useContext } from "react";
import ListContext from "../../../utils/contexts/ListsContext";

const List = (props) => {
    const { data } = useContext(ListContext);

    const { edits, deletes } = props;

    const layout = (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((values, index) => {
                        return (
                            <tr key={index}>
                                <td>{values.title}</td>
                                <td>{values.content}</td>
                                <td
                                    onClick={() => {
                                        edits(values, index);
                                    }}>
                                    Edit
                                </td>
                                <td
                                    onClick={() => {
                                        deletes(index);
                                    }}>
                                    Delete
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

    return layout;
};

export default List;
