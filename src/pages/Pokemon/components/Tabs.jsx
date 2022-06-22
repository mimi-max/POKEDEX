import styles from './Tabs.module.css';

export default function Tabs(props) {
  const { pokemon, switchTab, tabOpen } = props;
  const totalStat = pokemon?.stats
    ?.map((stat) => stat.base_stat)
    .reduce((previousValue, currentValue) => previousValue + currentValue);

  return (
    <>
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button
            type="button"
            className={styles.tab}
            onClick={() => { switchTab('about'); }}
          >
            About

          </button>
          <button
            type="button"
            className={styles.tab}
            onClick={() => { switchTab('baseState'); }}
          >
            Base Stats

          </button>
        </div>

        {tabOpen === 'about' && (
        <div>
          <p>
            <span>Weight:</span>
            {pokemon && (
            <span className={styles.tabSpan}>
              {pokemon.weight / 10}
              {' '}
              kg
            </span>
            )}
          </p>
          <p>
            <span>Height:</span>
            {' '}
            {pokemon && (
            <span className={styles.tabSpan}>
              {pokemon.height * 10}
              {' '}
              cm
            </span>
            )}
          </p>
          <p>
            <span>Abilities:</span>
            <span className={styles.tabSpan}>
              {pokemon?.abilities.map((ability) => ability.ability.name).join(', ')}
            </span>
          </p>
        </div>
        )}
      </div>

      {tabOpen === 'baseState' && (
      <div>
        <div className={styles.border}>
          {pokemon?.stats.map((stat) => {
            const progressbar = (stat.base_stat / 255) * 100;

            return (
              <div>

                <p className={styles.tabPara}>

                  <span className={styles.titleColumn}>{stat.stat.name}</span>

                  <span style={{ width: '50px' }}>{stat.base_stat}</span>
                  <span style={{
                    width: '200px', backgroundColor: '#a6afab', display: 'block', height: '8px',
                  }}
                  >
                    <span style={{
                      backgroundColor: stat.base_stat <= 50 ? 'red' : 'green', display: 'block', height: '100%', width: `${progressbar}%`,
                    }}
                    />
                  </span>

                </p>
              </div>
            );
          })}
          {' '}

        </div>
        <div className={styles.tabContent}>
          <p className={styles.tabPara}>
            <span className={styles.titleColumn}>Totale</span>
            <span style={{ width: '50px' }}>
              {pokemon?.stats
                .map((stat) => stat.base_stat)
                .reduce((previousValue, currentValue) => previousValue + currentValue)}
            </span>
            <span style={{
              width: '200px', backgroundColor: '#a6afab', display: 'block', height: '8px',
            }}
            >
              <span style={{
                backgroundColor: totalStat <= 50 ? 'red' : 'green', display: 'block', height: '100%', width: `${(totalStat / 1530) * 100}%`,
              }}
              />
            </span>

          </p>

        </div>

      </div>
      )}
    </>

  );
}
