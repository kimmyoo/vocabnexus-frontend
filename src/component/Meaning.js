import React from 'react'

const Meaning = ({ meaning, handleMeaningChange, index }) => {


  return (
    <div key={index}>
      <span>def. {index + 1}</span>
      <select
        name="partOfSpeech"
        value={meaning.partOfSpeech}
        onChange={e => handleMeaningChange(e, index)}
      >
        <option value="">Select</option>
        <option value="verb">Verb</option>
        <option value="noun">Noun</option>
        <option value="adj.">Adjective</option>
        <option value="adv.">Adverb</option>
        <optgroup label="Word Affix">
          <option value="prefix">prefix--</option>
          <option value="base word">base</option>
          <option value="suffix">--suffix</option>
        </optgroup>
        <option value="other">other</option>
      </select>

      <textarea
        rows="2"
        type="text"
        name="definition"
        value={meaning.definition}
        onChange={e => handleMeaningChange(e, index)}
      />

      {
        meaning.sentence &&
        <>
          <label>example sentence</label>
          <textarea
            rows="3"
            type="text"
            name="sentence"
            value={meaning.sentence}
            onChange={e => handleMeaningChange(e, index)}
          />
        </>
      }
    </div>
  )
}

export default Meaning