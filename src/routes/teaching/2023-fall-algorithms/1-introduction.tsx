export const meta = {
  title: 'Chapter 1: Introduction',
  subtitle: 'Algorithms',
  description: 'Definition of algorithms',
  slideshow: true,
};

export default () => (
  <Slideshow meta={meta}>
    <Slide title="General Information">
      <p>Hello everyone! Welcome to Paris, I hope you'll have a fantastic term here.</p>
      <dl>
        <dt>Lectures</dt>
        <dd>
          <ul>
            <li>Tuesday 17:45-19:00, 19:15-20:00</li>
            <li>Thursday 17:45-19:00, 19:15-20:00</li>
            <li>Lectures and recitations will be combined</li>
          </ul>
        </dd>
        <dt>Resources</dt>
        <dd>
          <ul>
            <li>
              Annotated slides on <A href="/">https://nguyen.me.uk</A>
            </li>
            <li>
              <Cite key="clrs" reference />
            </li>
          </ul>
        </dd>
        <dt>Email</dt>
        <dd>
          <a href="mailto:nguyen.khoi@nyu.edu">nguyen.khoi@nyu.edu</a>
        </dd>
        <dt>Office hour</dt>
        <dd>Send me an email</dd>
        <dt>Evaluation</dt>
        <dd>
          <ul>
            <li>Homework: 50%</li>
            <li>Midterm: 25%</li>
            <li>Final: 25%</li>
          </ul>
        </dd>
      </dl>
    </Slide>
    <Slide title="Syllabus">
      <dl>
        <dt>Chapter 1</dt>
        <dd>
          <ul>
            <li>
              What's an algorithm? What's a <strong>good</strong> algorithm?
            </li>
            <li>Termination, complexity, big-{tex`\bigo`} notation</li>
          </ul>
          <p>
            Reference:{' '}
            <Cite key="clrs" narrative>
              Chapters 1 and 2
            </Cite>
          </p>
        </dd>
      </dl>
    </Slide>
    <Slide title="Notes about code">
      <ul>
        <li>
          <strong>Programming language:</strong> Python 3
        </li>
        <li>
          <strong>Recommended setup:</strong> Visual Studio Code + Jupyter extension
        </li>
      </ul>
      <p>
        During lectures, you'll be able to edit and run code cells directly from the browser.
        Double-click on the code below to edit it.
      </p>
      <Jupyter>
        {py`
          from sympy import *
          A, x, r = symbols("A, x, r", real=True, positive=True)
          Eq(A, integrate(4 * sqrt(r**2 - x**2), (x, 0, r)))
        `}
      </Jupyter>
    </Slide>
    <Slide title="What is an algorithm?" cite={['clrs', 'p. 3']}>
      <Question>
        <p>What is an algorithm?</p>
      </Question>
      <Definition title="Algorithm">
        <p>Sequence of computational steps that transform the input into an output</p>
      </Definition>
    </Slide>
    <Slide title="Example: Insertion sort" cite={['clrs', 'p. 17']}>
      <Question>
        <p>When playing cards, how would you sort your hand in ascending order?</p>
      </Question>
      <Jupyter>
        {py`
          right_hand = [3, 7, 4, 1, 2, 7, 3]
          left_hand = []

          for card in right_hand:
              position = len([c for c in left_hand if c <= card])
              left_hand.insert(position, card)

          left_hand
        `}
      </Jupyter>
      <Question>
        <p>What can be improved in the above algorithm?</p>
      </Question>
    </Slide>
    <Slide title="Insertion sort">
      <p>
        Here is a more standard implementation of <strong>insertion sort</strong>
      </p>
      <Jupyter>
        {py`
          A = [3, 7, 8, 1, 2, 7, 3]
          for i, key in enumerate(A):
              j = i - 1
              while j >= 0 and key < A[j]:
                  A[j + 1] = A[j]
                  j -= 1
              A[j + 1] = key
          A
        `}
      </Jupyter>
    </Slide>
  </Slideshow>
);
