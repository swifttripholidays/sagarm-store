import React from 'react';
import { FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function SizeGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 1050,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="card"
          style={{
            maxWidth: '600px',
            width: '100%',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '28px',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
              Sagarm Royal Size Guide
            </h3>
            <button onClick={onClose} style={{ fontSize: '1.2rem' }}>
              <FiX />
            </button>
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            All measurements are presented in inches. For custom tailoring inquiries, please contact our VIP Concierge team.
          </p>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-surface-soft)', borderBottom: '2px solid var(--color-primary)' }}>
                <th style={{ padding: '10px' }}>Size</th>
                <th style={{ padding: '10px' }}>Chest (in)</th>
                <th style={{ padding: '10px' }}>Waist (in)</th>
                <th style={{ padding: '10px' }}>Hip (in)</th>
                <th style={{ padding: '10px' }}>Length (in)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '10px', fontWeight: 600 }}>XS</td>
                <td>34 - 36</td>
                <td>28 - 30</td>
                <td>36 - 38</td>
                <td>42</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '10px', fontWeight: 600 }}>S</td>
                <td>36 - 38</td>
                <td>30 - 32</td>
                <td>38 - 40</td>
                <td>43</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '10px', fontWeight: 600 }}>M</td>
                <td>38 - 40</td>
                <td>32 - 34</td>
                <td>40 - 42</td>
                <td>44</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '10px', fontWeight: 600 }}>L</td>
                <td>42 - 44</td>
                <td>36 - 38</td>
                <td>44 - 46</td>
                <td>45</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '10px', fontWeight: 600 }}>XL</td>
                <td>46 - 48</td>
                <td>40 - 42</td>
                <td>48 - 50</td>
                <td>46</td>
              </tr>
            </tbody>
          </table>

          <div style={{ marginTop: '20px', padding: '12px', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary)' }}>
              Note on Fit:
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginLeft: '6px' }}>
              Our formal sherwanis and bridal couture feature structured silhouettes with built-in margins.
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
