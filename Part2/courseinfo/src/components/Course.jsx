import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

function Course({course}) { 
   
    const total = course.parts.reduce((acc,part) =>  acc+= part.exercises, 0);

    return (
        <div>
            <Header name={course.name} /> 
            {course.parts.map(part => <Content key={part.id} part={part} />)}       
            <Footer total={total} /> 
        </div>
    );
}

export default Course; 