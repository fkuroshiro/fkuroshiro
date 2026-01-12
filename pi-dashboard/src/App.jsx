import React, { useState, useEffect } from 'react';
import { Zap, Flame, Database, HardDrive } from 'lucide-react';

const RaspberryPiDashboard = () => {
  const [systemData, setSystemData] = useState({
    status: 'Loading...',
    hostname: 'raspberrypi',
    ipAddress: '192.168.0.69',
    uptime: '0d 0h 0m',
    temperature: '0',
    cpuUsage: 0,
    loadAverage: '0.00, 0.00, 0.00',
    memoryUsed: '0',
    memoryTotal: '0',
    memoryPercent: 0,
    rootUsed: '0',
    rootTotal: '0',
    rootPercent: 0
  });

  // Fetch real data from your Raspberry Pi API
  const fetchSystemData = async () => {
    try {
      // Replace with your actual Raspberry Pi IP or domain
      const response = await fetch('http://192.168.0.69:5000/api/stats');
      const data = await response.json();

      setSystemData({
        status: 'Online',
        hostname: data.hostname,
        ipAddress: data.ip,
        uptime: data.uptime,
        temperature: data.temp.replace('°C', ''),
        cpuUsage: data.cpu_percent,
        loadAverage: data.load_avg,
        memoryUsed: data.memory_used,
        memoryTotal: data.memory_total,
        memoryPercent: data.memory_percent,
        rootUsed: data.disk_used,
        rootTotal: data.disk_total,
        rootPercent: data.disk_percent
      });
    } catch (error) {
      console.error('Failed to fetch system data:', error);
      setSystemData(prev => ({ ...prev, status: 'Offline' }));
    }
  };

  // Fetch data on mount and every 3 seconds
  useEffect(() => {
    fetchSystemData();
    const interval = setInterval(fetchSystemData, 3000);
    return () => clearInterval(interval);
  }, []);

  const theme = {
    bg: '#1a1b26',
    card: '#24283b',
    border: '#414868',
    text: '#c0caf5',
    subtext: '#9aa5ce',
    mauve: '#bb9af7',
    green: '#9ece6a',
    red: '#f7768e',
    yellow: '#e0af68',
    blue: '#7aa2f7'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.bg,
      color: theme.text,
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: theme.card,
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        border: `1px solid ${theme.border}`,
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '0.5rem'
        }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill={theme.mauve}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 700,
            color: theme.mauve,
            margin: 0
          }}>
            Raspberry Pi Dashboard
          </h1>
        </div>
        <p style={{
          color: theme.subtext,
          fontSize: '1.1rem',
          margin: 0
        }}>
          Real-time system monitoring
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* System Status Card */}
        <div style={{
          background: theme.card,
          borderRadius: '16px',
          padding: '1.5rem',
          border: `1px solid ${theme.border}`
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem'
          }}>
            <Zap size={24} color={theme.yellow} />
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 600,
              margin: 0
            }}>
              System Status
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: theme.subtext }}>Status</span>
              <span style={{
                background: systemData.status === 'Online' ? theme.green : theme.red,
                color: theme.bg,
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  background: theme.bg,
                  borderRadius: '50%'
                }}></span>
                {systemData.status}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: theme.subtext }}>Hostname</span>
              <span style={{ fontWeight: 500 }}>{systemData.hostname}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: theme.subtext }}>IP Address</span>
              <span style={{ fontWeight: 500 }}>{systemData.ipAddress}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: theme.subtext }}>Uptime</span>
              <span style={{ fontWeight: 500 }}>{systemData.uptime}</span>
            </div>
          </div>
        </div>

        {/* CPU & Temperature Card */}
        <div style={{
          background: theme.card,
          borderRadius: '16px',
          padding: '1.5rem',
          border: `1px solid ${theme.border}`
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem'
          }}>
            <Flame size={24} color={theme.red} />
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 600,
              margin: 0
            }}>
              CPU & Temperature
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Temperature */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: theme.subtext }}>Temperature</span>
                <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>
                  {systemData.temperature}°C
                </span>
              </div>
              <div style={{
                background: theme.border,
                height: '8px',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  background: `linear-gradient(90deg, ${theme.green}, ${theme.yellow})`,
                  height: '100%',
                  width: `${(systemData.temperature / 80) * 100}%`,
                  borderRadius: '4px',
                  transition: 'width 0.5s ease'
                }}></div>
              </div>
            </div>

            {/* CPU Usage */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: theme.subtext }}>CPU Usage</span>
                <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>
                  {systemData.cpuUsage}%
                </span>
              </div>
              <div style={{
                background: theme.border,
                height: '8px',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  background: theme.mauve,
                  height: '100%',
                  width: `${systemData.cpuUsage}%`,
                  borderRadius: '4px',
                  transition: 'width 0.5s ease'
                }}></div>
              </div>
            </div>

            {/* Load Average */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: theme.subtext }}>Load Average</span>
                <span style={{ fontWeight: 500 }}>
                  {systemData.loadAverage}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Memory Card */}
        <div style={{
          background: theme.card,
          borderRadius: '16px',
          padding: '1.5rem',
          border: `1px solid ${theme.border}`
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem'
          }}>
            <Database size={24} color={theme.blue} />
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 600,
              margin: 0
            }}>
              Memory
            </h2>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ color: theme.subtext }}>Usage</span>
              <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>
                {systemData.memoryPercent}%
              </span>
            </div>
            <div style={{
              background: theme.border,
              height: '8px',
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                background: theme.blue,
                height: '100%',
                width: `${systemData.memoryPercent}%`,
                borderRadius: '4px',
                transition: 'width 0.5s ease'
              }}></div>
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <div style={{
                flex: 1,
                background: theme.bg,
                padding: '1.5rem',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: theme.mauve,
                  marginBottom: '0.25rem'
                }}>
                  {systemData.memoryUsed}
                </div>
                <div style={{ color: theme.subtext, fontSize: '0.9rem' }}>
                  Used
                </div>
              </div>

              <div style={{
                flex: 1,
                background: theme.bg,
                padding: '1.5rem',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: theme.text,
                  marginBottom: '0.25rem'
                }}>
                  {systemData.memoryTotal}
                </div>
                <div style={{ color: theme.subtext, fontSize: '0.9rem' }}>
                  Total
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Storage Card */}
        <div style={{
          background: theme.card,
          borderRadius: '16px',
          padding: '1.5rem',
          border: `1px solid ${theme.border}`
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem'
          }}>
            <HardDrive size={24} color={theme.green} />
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 600,
              margin: 0
            }}>
              Storage
            </h2>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ color: theme.subtext }}>Root Usage</span>
              <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>
                {systemData.rootPercent}%
              </span>
            </div>
            <div style={{
              background: theme.border,
              height: '8px',
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                background: theme.green,
                height: '100%',
                width: `${systemData.rootPercent}%`,
                borderRadius: '4px',
                transition: 'width 0.5s ease'
              }}></div>
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <div style={{
                flex: 1,
                background: theme.bg,
                padding: '1.5rem',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: theme.green,
                  marginBottom: '0.25rem'
                }}>
                  {systemData.rootUsed}
                </div>
                <div style={{ color: theme.subtext, fontSize: '0.9rem' }}>
                  Used
                </div>
              </div>

              <div style={{
                flex: 1,
                background: theme.bg,
                padding: '1.5rem',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: theme.text,
                  marginBottom: '0.25rem'
                }}>
                  {systemData.rootTotal}
                </div>
                <div style={{ color: theme.subtext, fontSize: '0.9rem' }}>
                  Total
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default RaspberryPiDashboard;