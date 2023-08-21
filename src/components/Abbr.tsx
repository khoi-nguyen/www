const abbreviations = {
  BSc: 'Bachelor of Science',
  CV: 'Curriculum Vitæ',
  DOM: 'Document Object Model',
  GCSE: 'General Certificate of Secondary Education',
  IBDP: 'International Baccalaureate Diploma Programme',
  IGCSE: 'International General Certificate of Secondary Education',
  JSX: 'JavaScript Syntax Extension',
  MASt: 'Master of Advanced Study',
  MIT: 'Massachusetts Institute of Technology',
  NYU: 'New York University',
  PGCE: 'Postgraduate Certificate of Education',
  PhD: 'Philosophiæ Doctor',
};

interface AbbrProps {
  key: keyof typeof abbreviations;
}

export default function Abbr(props: AbbrProps) {
  return <abbr title={abbreviations[props.key]}>{props.key}</abbr>;
}
