import React, { useState } from 'react';
import { ColumnType } from '../types';

interface AddColumnDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (column: Omit<{ type: ColumnType; name: string; options?: string[] }, 'id' | 'createdAt'>) => void;
}

const AddColumnDialog: React.FC<AddColumnDialogProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<ColumnType>('text');
  const [options, setOptions] = useState('');
  
  const handleAdd = () => {
    if (!name.trim()) return;
    
    const columnData: Omit<{ type: ColumnType; name: string; options?: string[] }, 'id' | 'createdAt'> = {
      name: name.trim(),
      type,
    };
    
    if ((type === 'select' || type === 'multiSelect') && options.trim()) {
      columnData.options = options.split(',').map(o => o.trim()).filter(o => o);
    }
    
    onAdd(columnData);
    setName('');
    setType('text');
    setOptions('');
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h3>添加列</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="dialog-body">
          <div className="form-group">
            <label>列名称</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="输入列名称"
              autoFocus
            />
          </div>
          
          <div className="form-group">
            <label>列类型</label>
            <select value={type} onChange={(e) => setType(e.target.value as ColumnType)}>
              <option value="text">文本</option>
              <option value="number">数字</option>
              <option value="date">日期</option>
              <option value="select">单选</option>
              <option value="multiSelect">多选</option>
              <option value="checkbox">复选框</option>
              <option value="url">链接</option>
              <option value="email">邮箱</option>
            </select>
          </div>
          
          {(type === 'select' || type === 'multiSelect') && (
            <div className="form-group">
              <label>选项（用逗号分隔）</label>
              <input
                type="text"
                value={options}
                onChange={(e) => setOptions(e.target.value)}
                placeholder="选项1, 选项2, 选项3"
              />
            </div>
          )}
        </div>
        
        <div className="dialog-footer">
          <button className="button button-secondary" onClick={onClose}>
            取消
          </button>
          <button className="button button-primary" onClick={handleAdd}>
            添加
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddColumnDialog;
