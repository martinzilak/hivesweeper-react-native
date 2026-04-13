import { FC, Fragment } from 'react';
import { PolicyContent } from '../../constants';
import { StyledLi, StyledP, StyledStrong, StyledUl } from '../../components/Styled';

const Policy: FC = () => (
  <>
    {PolicyContent.map(({ header, paragraphs }, sectionIndex) => (
      <Fragment key={`section-${sectionIndex}`}>
        <StyledStrong>{header}</StyledStrong>

        {paragraphs.map(({ content }, paragraphIndex) => (
          <Fragment key={`paragraph-${paragraphIndex}`}>
            {typeof content === 'string' && <StyledP>{content}</StyledP>}
            {Array.isArray(content) && (
              <StyledUl>
                {content.map((item, itemIndex) => (
                  <StyledLi key={`item-${itemIndex}`}>{item}</StyledLi>
                ))}
              </StyledUl>
            )}
          </Fragment>
        ))}

        <br />
      </Fragment>
    ))}
  </>
);

export default Policy;
