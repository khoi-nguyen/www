const abbreviations = {
  API: 'Application Programming Interface',
  BSc: 'Bachelor of Science',
  CAS: 'Computer Algebra System',
  CRUD: 'Create, Read, Update, Delete',
  CSS: 'Cascading Style Sheets',
  CSR: 'Client-Side Rendering',
  CV: 'Curriculum Vitæ',
  DOM: 'Document Object Model',
  DX: 'Developer Experience',
  ECAM: 'École Centrale des Arts et Métiers',
  ERP: 'Enterprise Resource Planning',
  GCSE: 'General Certificate of Secondary Education',
  GEI: 'Génie Électronique et Informatique',
  GNU: "GNU's Not Unix",
  HTML: 'HyperText Markup Language',
  HTTP: 'Hypertext Transfer Protocol',
  HTTPS: 'Hypertext Transfer Protocol Secure',
  IBDP: 'International Baccalaureate Diploma Programme',
  IGCSE: 'International General Certificate of Secondary Education',
  JPEG: 'Joint Photographic Experts Group',
  JSON: 'JavaScript Object Notation',
  JSX: 'JavaScript Syntax Extension',
  LTS: 'Long-term support',
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
  SFC: 'Single File Components',
  SOAP: 'Simple Object Access Protocol',
  SPA: 'Single Page Application',
  SQL: 'Structured Query Language',
  SSR: 'Server Side Rendering',
  UI: 'User Interface',
  URL: 'Uniform Resource Locator',
  UX: 'User Experience',
  XML: 'Extended Markup Language',
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
