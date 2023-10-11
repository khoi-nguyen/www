import meta from './4-midterm.json';

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="About the midterm" columns>
        <ul>
          <li>31 October 2023</li>
          <li>Computers and calculators not allowed</li>
          <li>You can bring one A4 sheet with your own notes</li>
        </ul>
        <div>
          <h3>Contents</h3>
          <ol>
            <li>
              Basics
              <ul>
                <li>Establish and prove the time complexity of an algorithm</li>
                <li>Solve recursions</li>
                <li>Find and prove the loop invariant of an algorithm</li>
              </ul>
            </li>
            <li>Divide and conquer</li>
            <li>Dynamic programming</li>
            <li>Greedy</li>
          </ol>
        </div>
      </Slide>
      <Slide title="NYU Practice midterm">
        <Iframe src="https://cims.nyu.edu/~regev/teaching/basic_algorithms_spring_2022/practice_midterm.pdf" />
      </Slide>
      <Slide title="Textbook exercises">
        <p>
          Exercises from <Cite key="clrs" />
        </p>
        <ul>
          <li>Solving recurrences: 4.4-1, 4.4-4</li>
          <li>Dynamic programming: 14-2</li>
          <li>Huffman: 15.3-3</li>
        </ul>
      </Slide>
      <Slide title="Recurrence relations">
        <p>Instead of using the Master Theorem, draw a tree and do the proof by induction</p>
        <Iframe src="https://www.csd.uwo.ca/~mmorenom/CS433-CS9624/Resources/master.pdf" />
      </Slide>
      <Slide title="Divide and conquer">
        <Iframe src="https://cusack.hope.edu/Notes/Notes/Algorithms/Worksheets/DivideAndConquerWorksheet.pdf" />
      </Slide>
      <Slide title="Dynamic programming">
        <Iframe src="https://jeffe.cs.illinois.edu/teaching/algorithms/book/03-dynprog.pdf" />
      </Slide>
    </Slideshow>
  );
};
