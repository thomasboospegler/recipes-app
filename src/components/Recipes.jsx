import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

export default function Recipes({ list, recipeType }) {
  return (
    <section className="cards-container">
      { list.map((recipe, index) => {
        const maxIndex = 12;

        if (index >= maxIndex) return null;

        return (<Card
          key={ index }
          recipe={ recipe }
          recomended={ false }
          index={ index }
          recipeType={ recipeType }
        />);
      })}
    </section>
  );
}

Recipes.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  recipeType: PropTypes.string.isRequired,
};
