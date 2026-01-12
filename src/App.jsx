import React, { useState, useEffect } from 'react';
import { Moon, Sun, Github, Instagram, Mail, ExternalLink, ChevronDown, Terminal, Code, Palette, Cpu } from 'lucide-react';

const Portfolio = () => {
  const [isDark, setIsDark] = useState(true);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const phrases = [
    "Web Developer",
    "Dark Design Maniac",
    "IT Student",
    "Frontend Enthusiast"
  ];

  const projects = [
    {
      title: "Portfolio Website",
      description: "Personal portfolio showcasing my work and skills",
      tech: ["React", "Vite", "SCSS"],
      link: "https://fkuroshiro.xyz"
    },
    {
      title: "Raspberry Pi Dashboard",
      description: "Custom dashboard for monitoring and controlling my Raspberry Pi",
      tech: ["Node.js", "React", "WebSockets"],
      link: "#"
    },
    {
      title: "Project Three",
      description: "An awesome project I'm working on",
      tech: ["JavaScript", "CSS", "HTML"],
      link: "#"
    }
  ];

  const skills = [
    { name: "React", level: 85 },
    { name: "JavaScript", level: 90 },
    { name: "SCSS/CSS", level: 88 },
    { name: "Node.js", level: 75 },
    { name: "Git", level: 82 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      window.location.href = `mailto:admin@fkuroshiro.xyz?subject=Contact from ${formData.name}&body=${formData.message}`;
    } else {
      alert('Please fill in all fields');
    }
  };

  const theme = isDark ? {
    bg: '#1e1e2e',
    surface: '#313244',
    text: '#cdd6f4',
    subtext: '#a6adc8',
    mauve: '#cba6f7',
    accent: '#cba6f7',
    hover: '#45475a'
  } : {
    bg: '#eff1f5',
    surface: '#e6e9ef',
    text: '#4c4f69',
    subtext: '#6c6f85',
    mauve: '#8839ef',
    accent: '#8839ef',
    hover: '#dce0e8'
  };

  return (
    <div style={{
      background: theme.bg,
      color: theme.text,
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      transition: 'background 0.3s ease, color 0.3s ease'
    }}>
      {/* Navbar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: `${theme.surface}cc`,
        backdropFilter: 'blur(10px)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        borderBottom: `1px solid ${theme.hover}`
      }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 600, color: theme.mauve }}>
          fkuroshiro.xyz
        </div>
        <div style={{ fontSize: '1rem', fontWeight: 500 }}>
          Dominik Bobruska
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            onClick={() => window.open('#', '_blank')}
            style={{
              background: theme.mauve,
              color: theme.bg,
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Terminal size={16} /> Dashboard
          </button>
          <button
            onClick={() => setIsDark(!isDark)}
            style={{
              background: theme.surface,
              color: theme.text,
              border: `1px solid ${theme.hover}`,
              padding: '0.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = theme.hover}
            onMouseOut={(e) => e.currentTarget.style.background = theme.surface}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        background: `linear-gradient(135deg, ${theme.bg} 0%, ${theme.surface} 100%)`
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          background: `radial-gradient(circle, ${theme.mauve}22 0%, transparent 70%)`,
          filter: 'blur(60px)',
          animation: 'pulse 4s ease-in-out infinite'
        }} />

        <h1 style={{
          fontSize: '4rem',
          fontWeight: 700,
          marginBottom: '1rem',
          textAlign: 'center',
          color: theme.mauve
        }}>
          fkuroshiro
        </h1>

        <div style={{ height: '2.5rem', marginBottom: '2rem' }}>
          <p style={{
            fontSize: '1.5rem',
            color: theme.subtext,
            textAlign: 'center',
            animation: 'fadeIn 1s ease-in-out'
          }}>
            {phrases[currentPhrase]}
          </p>
        </div>

        <button
          onClick={() => scrollToSection('about')}
          style={{
            position: 'absolute',
            bottom: '2rem',
            background: 'transparent',
            border: 'none',
            color: theme.mauve,
            cursor: 'pointer',
            animation: 'bounce 2s infinite'
          }}
        >
          <ChevronDown size={40} />
        </button>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {/* About Me Card */}
          <div style={{
            background: theme.surface,
            padding: '2rem',
            borderRadius: '16px',
            border: `1px solid ${theme.hover}`,
            transition: 'transform 0.3s ease',
            cursor: 'pointer'
          }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Code size={32} color={theme.mauve} style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: theme.mauve }}>About Me</h3>
            <p style={{ color: theme.subtext, lineHeight: '1.6' }}>
              19-year-old IT student with a passion for web development and dark design aesthetics.
              Currently studying at high school, building projects, and exploring new technologies.
            </p>
          </div>

          {/* Tech Stack Card */}
          <div style={{
            background: theme.surface,
            padding: '2rem',
            borderRadius: '16px',
            border: `1px solid ${theme.hover}`,
            transition: 'transform 0.3s ease',
            cursor: 'pointer'
          }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Cpu size={32} color={theme.mauve} style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: theme.mauve }}>Tech Skills</h3>
            {skills.map((skill, idx) => (
              <div key={idx} style={{ marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.9rem' }}>{skill.name}</span>
                  <span style={{ fontSize: '0.9rem', color: theme.subtext }}>{skill.level}%</span>
                </div>
                <div style={{
                  background: theme.hover,
                  height: '6px',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    background: theme.mauve,
                    height: '100%',
                    width: `${skill.level}%`,
                    transition: 'width 1s ease',
                    borderRadius: '3px'
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Socials Card */}
          <div style={{
            background: theme.surface,
            padding: '2rem',
            borderRadius: '16px',
            border: `1px solid ${theme.hover}`,
            transition: 'transform 0.3s ease',
            cursor: 'pointer'
          }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Palette size={32} color={theme.mauve} style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: theme.mauve }}>Connect</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="https://github.com/fkuroshiro" target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: theme.text,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = theme.mauve}
                onMouseOut={(e) => e.currentTarget.style.color = theme.text}
              >
                <Github size={20} /> GitHub
              </a>
              <a href="https://www.instagram.com/fkuroshiro/" target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: theme.text,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = theme.mauve}
                onMouseOut={(e) => e.currentTarget.style.color = theme.text}
              >
                <Instagram size={20} /> Instagram
              </a>
              <a href="mailto:admin@fkuroshiro.xyz"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: theme.text,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = theme.mauve}
                onMouseOut={(e) => e.currentTarget.style.color = theme.text}
              >
                <Mail size={20} /> Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" style={{ padding: '4rem 2rem', background: theme.surface }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '2rem',
            textAlign: 'center',
            color: theme.mauve
          }}>
            Projects
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {projects.map((project, idx) => (
              <a
                key={idx}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: theme.bg,
                  padding: '2rem',
                  borderRadius: '16px',
                  border: `1px solid ${theme.hover}`,
                  textDecoration: 'none',
                  color: theme.text,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  display: 'block'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = theme.mauve;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = theme.hover;
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.3rem', color: theme.mauve }}>{project.title}</h3>
                  <ExternalLink size={20} color={theme.mauve} />
                </div>
                <p style={{ color: theme.subtext, marginBottom: '1rem', lineHeight: '1.6' }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {project.tech.map((tech, techIdx) => (
                    <span key={techIdx} style={{
                      background: theme.hover,
                      padding: '0.3rem 0.8rem',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      color: theme.mauve
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '4rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '2.5rem',
          marginBottom: '2rem',
          textAlign: 'center',
          color: theme.mauve
        }}>
          Get In Touch
        </h2>
        <div style={{
          background: theme.surface,
          padding: '2rem',
          borderRadius: '16px',
          border: `1px solid ${theme.hover}`
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: theme.subtext }}>Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: '100%',
                padding: '0.8rem',
                background: theme.bg,
                border: `1px solid ${theme.hover}`,
                borderRadius: '8px',
                color: theme.text,
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: theme.subtext }}>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{
                width: '100%',
                padding: '0.8rem',
                background: theme.bg,
                border: `1px solid ${theme.hover}`,
                borderRadius: '8px',
                color: theme.text,
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: theme.subtext }}>Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={5}
              style={{
                width: '100%',
                padding: '0.8rem',
                background: theme.bg,
                border: `1px solid ${theme.hover}`,
                borderRadius: '8px',
                color: theme.text,
                fontSize: '1rem',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              background: theme.mauve,
              color: theme.bg,
              border: 'none',
              padding: '1rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Send Message
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: theme.surface,
        padding: '2rem',
        textAlign: 'center',
        borderTop: `1px solid ${theme.hover}`
      }}>
        <p style={{ color: theme.subtext, marginBottom: '0.5rem' }}>
          © 2026 fkuroshiro. All rights reserved.
        </p>
        <p style={{ color: theme.subtext, fontSize: '0.9rem' }}>
          Built with React & Vite
        </p>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;