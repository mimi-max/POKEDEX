import styles from './Tabs.module.css';

export default function Tabs(props) {
  const { pokemon, switchTab, tabOpen } = props;
  const totalStat = pokemon?.stats
    ?.map((stat) => stat.base_stat)
    .reduce((previousValue, currentValue) => previousValue + currentValue);

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${tabOpen === 'about' ? styles.currentTab : ''}`}
          onClick={() => { switchTab('about'); }}
        >
          About
        </button>
        <button
          type="button"
          className={`${styles.tab} ${tabOpen === 'baseStat' ? styles.currentTab : ''}`}
          onClick={() => { switchTab('baseStat'); }}
        >
          Base Stats
        </button>
      </div>
      <div className={styles.border} />

      {tabOpen === 'about' && (
        <div className={styles.containerStat}>
          <div className={styles.tabOpen}>
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
        </div>
      )}

      {tabOpen === 'baseStat' && (
        <div className={styles.containerStat}>
          <div className={styles.tabOpen}>
            {pokemon?.stats.map((stat) => {
              const progressbar = (stat.base_stat / 255) * 100;
              return (
                <div className={styles.stat}>
                  <span className={styles.titleColumn}>{stat.stat.name}</span>
                  <span style={{ width: '50px' }}>{stat.base_stat}</span>
                  <span
                    style={{
                      width: '200px', backgroundColor: '#a6afab', display: 'block', height: '8px',
                    }}
                    className={styles.progressbarResize}
                  >
                    <span style={{
                      backgroundColor: stat.base_stat <= 50 ? 'red' : 'green', display: 'block', height: '100%', width: `${progressbar}%`,
                    }}
                    />
                  </span>
                </div>
              );
            })}
            {' '}
            <div className={styles.stat}>
              <span className={styles.titleColumn}>Totale</span>
              <span style={{ width: '50px' }}>
                {pokemon?.stats
                  .map((stat) => stat.base_stat)
                  .reduce((previousValue, currentValue) => previousValue + currentValue)}
              </span>
              <span
                style={{
                  width: '200px', backgroundColor: '#a6afab', display: 'block', height: '8px',
                }}
                className={styles.progressbarResize}
              >
                <span style={{
                  backgroundColor: totalStat <= 50 ? 'red' : 'green', display: 'block', height: '100%', width: `${(totalStat / 1530) * 100}%`,
                }}
                />
              </span>

            </div>
          </div>

        </div>
      )}
    </div>

  );
}
