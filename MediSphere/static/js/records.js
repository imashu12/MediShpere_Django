document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const recordInput = document.getElementById('recordUpload');
    const recordsGrid = document.getElementById('recordsGrid');
    const recordSummary = document.getElementById('recordSummary');
  
    let records = JSON.parse(localStorage.getItem('patientRecords')) || [];
  
    function updateSummary() {
      const total = records.length;
      const last = total > 0 ? new Date(records[total - 1].date).toLocaleString() : 'N/A';
      const pdf = records.filter(r => r.name.endsWith('.pdf')).length;
      const img = total - pdf;
  
      recordSummary.innerHTML = `🗂 <strong>${total}</strong> Files | 📄 PDF: <strong>${pdf}</strong> | 🖼 Images: <strong>${img}</strong> | ⏱ Last Upload: <strong>${last}</strong>`;
    }
  
    function renderRecords() {
      recordsGrid.innerHTML = '';
      if (records.length === 0) {
        recordsGrid.innerHTML = '<p>No records uploaded yet.</p>';
        return;
      }
  
      records.forEach((record, index) => {
        const card = document.createElement('div');
        card.className = 'record-card';
  
        card.innerHTML = `
          <h4><i class="fas fa-file-alt"></i> ${record.name}</h4>
          <small>Uploaded: ${new Date(record.date).toLocaleString()}</small>
          <input type="text" class="tag-input" placeholder="Tags (comma-separated)" value="${record.tags || ''}" data-index="${index}">
          <textarea class="note-input" placeholder="Notes...">${record.note || ''}</textarea>
          <div class="actions">
            <a href="${record.url}" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${record.url}" download="${record.name}"><i class="fas fa-download"></i> Download</a>
            <button onclick="copyLink('${record.url}')"><i class="fas fa-link"></i> Share</button>
            <button onclick="deleteRecord(${index})"><i class="fas fa-trash-alt"></i> Delete</button>
          </div>
        `;
        recordsGrid.appendChild(card);
      });
  
      // Tag and Note listeners
      document.querySelectorAll('.tag-input').forEach(input => {
        input.addEventListener('input', e => {
          const i = e.target.dataset.index;
          records[i].tags = e.target.value;
          save();
        });
      });
  
      document.querySelectorAll('.note-input').forEach((textarea, i) => {
        textarea.addEventListener('input', () => {
          records[i].note = textarea.value;
          save();
        });
      });
  
      updateSummary();
    }
  
    uploadForm.addEventListener('submit', e => {
      e.preventDefault();
      const file = recordInput.files[0];
      if (!file) return alert("Please select a file.");
      if (file.size > 5 * 1024 * 1024) return alert("File exceeds 5MB size limit.");
  
      const reader = new FileReader();
      reader.onload = function(event) {
        const newRecord = {
          name: file.name,
          url: event.target.result,
          date: new Date().toISOString(),
          tags: '',
          note: ''
        };
        records.push(newRecord);
        save();
        recordInput.value = '';
        renderRecords();
      };
      reader.readAsDataURL(file);
    });
  
    function deleteRecord(index) {
      if (confirm("Delete this record?")) {
        records.splice(index, 1);
        save();
        renderRecords();
      }
    }
  
    function save() {
      localStorage.setItem('patientRecords', JSON.stringify(records));
    }
  
    window.copyLink = function(url) {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  
    renderRecords();
  });
  