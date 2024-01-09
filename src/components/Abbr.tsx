const abbreviations = {
  API: 'Application Programming Interface',
  BSc: 'Bachelor of Science',
  CAS: 'Computer Algebra System',
  CSS: 'Cascading Style Sheets',
  CV: 'Curriculum Vitæ',
  DOM: 'Document Object Model',
  DX: 'Developer Experience',
  ECAM: 'École Centrale des Arts et Métiers',
  GCSE: 'General Certificate of Secondary Education',
  GEI: 'Génie Électronique et Informatique',
  GNU: "GNU's Not Unix",
  HTML: 'HyperText Markup Language',
  IBDP: 'International Baccalaureate Diploma Programme',
  IGCSE: 'International General Certificate of Secondary Education',
  JPEG: 'Joint Photographic Experts Group',
  JSX: 'JavaScript Syntax Extension',
  MASt: 'Master of Advanced Study',
  MP3: 'Moving Picture Experts Group Layer-3 Audio',
  MVC: 'Model View Controller',
  MIT: 'Massachusetts Institute of Technology',
  MPA: 'Multiple Page Application',
  NYU: 'New York University',
  ORM: 'Object-relational mapping',
  PGCE: 'Postgraduate Certificate of Education',
  PhD: 'Philosophiæ Doctor',
  PHP: 'PHP Hypertext Preprocessor',
  REST: 'Representational State Transfer',
  SEO: 'Search Engine Optimization',
  SPA: 'Single Page Application',
  SQL: 'Structured Query Language',
  SSR: 'Server Side Rendering',
  UI: 'User Interface',
  UX: 'User Experience',
}

interface AbbrProps {
  key: keyof typeof abbreviations
}

export default function Abbr(props: AbbrProps) {
  return (
    <abbr title={abbreviations[props.key]} class="clickable">
      {props.key}
    </abbr>
  )
}
