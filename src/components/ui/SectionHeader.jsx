import { Reveal } from './Reveal';

const SectionHeader = ({ title, subtitle, pretitle, align = 'center', className = '' }) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <div className={`max-w-3xl mb-16 ${alignmentClasses[align]} ${className}`}>
      {pretitle && (
        <Reveal direction="up" delay={0}>
          <p className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">
            {pretitle}
          </p>
        </Reveal>
      )}
      
      <Reveal direction="up" delay={0.1}>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-6">
          {title}
        </h2>
      </Reveal>

      {subtitle && (
        <Reveal direction="up" delay={0.2}>
          <p className="text-lg text-gray-600 leading-relaxed">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
};

export default SectionHeader;
