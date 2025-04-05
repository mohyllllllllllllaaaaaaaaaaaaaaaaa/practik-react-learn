export const SearchForm =({onSearch}) => {  //неконтрольована форма
const handelSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const topic = form.elements.topic.value;
    if(form.elements.topic.value.trim() === "") {
        alert("Please enter search term!");
        return;
    }
    onSearch(topic);
    form.reset();
};

return (
    <form onSubmit={handelSubmit}>
        <input type="text" name="topic" placeholder="Search articles..."/>
        <button>Search</button>
    </form>
);
};