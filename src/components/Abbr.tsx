const abbreviations = {
  BSc: 'Bachelor of Science',
  CV: 'Curriculum Vitæ',
  DOM: 'Document Object Model',
  ECAM: 'École Centrale des Arts et Métiers',
  GCSE: 'General Certificate of Secondary Education',
  IBDP: 'International Baccalaureate Diploma Programme',
  IGCSE: 'International General Certificate of Secondary Education',
  JPEG: 'Joint Photographic Experts Group',
  JSX: 'JavaScript Syntax Extension',
  MASt: 'Master of Advanced Study',
  MP3: 'Moving Picture Experts Group Layer-3 Audio',
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
