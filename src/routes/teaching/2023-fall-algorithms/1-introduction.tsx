import meta from './1-introduction.json';

export default () => (
  <Slideshow meta={meta}>
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
