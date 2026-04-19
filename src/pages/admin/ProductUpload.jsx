import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, Plus, Trash2, Save } from 'lucide-react';
import { productsAPI } from '../../services/api';
import '../../styles/pages/ProductUpload.css';

const ProductUpload = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'skincare',
    price: '',
    originalPrice: '',
    description: '',
    ingredients: '',
    volume: '',
    badge: '',
    color: 'yellow',
    stock: '',
    keyIngredients: [{ name: '', benefit: '' }],
    benefits: ['']
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Check if user is admin
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.email !== 'admin@evaris.com' && user.role !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  const categories = [
    { value: 'skincare', label: 'Skincare' },
    { value: 'serum', label: 'Serum' },
    { value: 'moisturizer', label: 'Moisturizer' },
    { value: 'cleanser', label: 'Cleanser' },
    { value: 'toner', label: 'Toner' },
    { value: 'mask', label: 'Mask' }
  ];

  const badgeOptions = [
    { value: 'best-seller', label: 'Best Seller' },
    { value: 'new-arrival', label: 'New Arrival' },
    { value: 'popular', label: 'Popular' },
    { value: 'limited-edition', label: 'Limited Edition' },
    { value: '', label: 'No Badge' }
  ];

  const colorOptions = [
    { value: 'yellow', label: 'Yellow', class: 'yellow' },
    { value: 'purple', label: 'Purple', class: 'purple' },
    { value: 'green', label: 'Green', class: 'green' },
    { value: 'blue', label: 'Blue', class: 'blue' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length !== files.length) {
      setErrors(prev => ({
        ...prev,
        images: 'Only image files are allowed'
      }));
    }

    setImageFiles(prev => [...prev, ...validFiles]);
    
    // Create previews
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const addKeyIngredient = () => {
    setFormData(prev => ({
      ...prev,
      keyIngredients: [...prev.keyIngredients, { name: '', benefit: '' }]
    }));
  };

  const updateKeyIngredient = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      keyIngredients: prev.keyIngredients.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeKeyIngredient = (index) => {
    setFormData(prev => ({
      ...prev,
      keyIngredients: prev.keyIngredients.filter((_, i) => i !== index)
    }));
  };

  const addBenefit = () => {
    setFormData(prev => ({
      ...prev,
      benefits: [...prev.benefits, '']
    }));
  };

  const updateBenefit = (index, value) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.map((item, i) => i === index ? value : item)
    }));
  };

  const removeBenefit = (index) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.ingredients.trim()) newErrors.ingredients = 'Ingredients are required';
    if (!formData.volume.trim()) newErrors.volume = 'Volume is required';
    if (!formData.stock || isNaN(formData.stock) || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Valid stock quantity is required';
    }
    if (imageFiles.length === 0) newErrors.images = 'At least one image is required';
    
    // Validate key ingredients
    const validKeyIngredients = formData.keyIngredients.filter(
      ing => ing.name.trim() && ing.benefit.trim()
    );
    if (validKeyIngredients.length === 0) {
      newErrors.keyIngredients = 'At least one key ingredient is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Add product details
      formDataToSend.append('name', formData.name);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('originalPrice', formData.originalPrice || formData.price);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('ingredients', formData.ingredients);
      formDataToSend.append('volume', formData.volume);
      formDataToSend.append('badge', formData.badge);
      formDataToSend.append('color', formData.color);
      formDataToSend.append('stock', formData.stock);
      formDataToSend.append('keyIngredients', JSON.stringify(
        formData.keyIngredients.filter(ing => ing.name.trim() && ing.benefit.trim())
      ));
      formDataToSend.append('benefits', JSON.stringify(
        formData.benefits.filter(b => b.trim())
      ));
      
      // Add images
      imageFiles.forEach((file, index) => {
        formDataToSend.append(`images`, file);
      });
      
      // Call the actual API with FormData
      const response = await productsAPI.create(formDataToSend);
      
      if (response.success) {
        // Success
        alert('Product uploaded successfully! It will now be available for users to buy.');
        navigate('/admin');
      } else {
        throw new Error(response.message || 'Failed to upload product');
      }
      
    } catch (error) {
      console.error('Error uploading product:', error);
      setErrors({ submit: error.message || 'Failed to upload product. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-upload">
      <div className="upload-header">
        <button onClick={() => navigate('/admin')} className="back-btn">
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <h1>Upload New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-grid">
          {/* Basic Information */}
          <div className="form-section">
            <h2>Basic Information</h2>
            
            <div className="form-group">
              <label>Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'error' : ''}
                placeholder="Enter product name"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={errors.category ? 'error' : ''}
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
                {errors.category && <span className="error-message">{errors.category}</span>}
              </div>

              <div className="form-group">
                <label>Price (Rs.) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={errors.price ? 'error' : ''}
                  placeholder="2999"
                  min="0"
                  step="0.01"
                />
                {errors.price && <span className="error-message">{errors.price}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Original Price (Rs.)</label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  placeholder="3999"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label>Stock Quantity *</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className={errors.stock ? 'error' : ''}
                  placeholder="50"
                  min="0"
                />
                {errors.stock && <span className="error-message">{errors.stock}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={errors.description ? 'error' : ''}
                placeholder="Describe your product..."
                rows="4"
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>

            <div className="form-group">
              <label>Ingredients *</label>
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleInputChange}
                className={errors.ingredients ? 'error' : ''}
                placeholder="List all ingredients..."
                rows="3"
              />
              {errors.ingredients && <span className="error-message">{errors.ingredients}</span>}
            </div>

            <div className="form-group">
              <label>Volume/Size *</label>
              <input
                type="text"
                name="volume"
                value={formData.volume}
                onChange={handleInputChange}
                className={errors.volume ? 'error' : ''}
                placeholder="50g / 1.76 fl.oz"
              />
              {errors.volume && <span className="error-message">{errors.volume}</span>}
            </div>
          </div>

          {/* Badge and Color */}
          <div className="form-section">
            <h2>Display Options</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>Badge</label>
                <select
                  name="badge"
                  value={formData.badge}
                  onChange={handleInputChange}
                >
                  {badgeOptions.map(badge => (
                    <option key={badge.value} value={badge.value}>{badge.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Badge Color</label>
                <div className="color-options">
                  {colorOptions.map(color => (
                    <label key={color.value} className="color-option">
                      <input
                        type="radio"
                        name="color"
                        value={color.value}
                        checked={formData.color === color.value}
                        onChange={handleInputChange}
                      />
                      <span className={`color-preview ${color.class}`}></span>
                      {color.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Ingredients */}
            <div className="form-group">
              <label>Key Ingredients *</label>
              {formData.keyIngredients.map((ingredient, index) => (
                <div key={index} className="ingredient-row">
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => updateKeyIngredient(index, 'name', e.target.value)}
                    placeholder="Ingredient name"
                    className={errors.keyIngredients ? 'error' : ''}
                  />
                  <input
                    type="text"
                    value={ingredient.benefit}
                    onChange={(e) => updateKeyIngredient(index, 'benefit', e.target.value)}
                    placeholder="Benefit"
                    className={errors.keyIngredients ? 'error' : ''}
                  />
                  <button
                    type="button"
                    onClick={() => removeKeyIngredient(index)}
                    className="remove-btn"
                    disabled={formData.keyIngredients.length === 1}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {errors.keyIngredients && <span className="error-message">{errors.keyIngredients}</span>}
              <button type="button" onClick={addKeyIngredient} className="add-btn">
                <Plus size={16} />
                Add Key Ingredient
              </button>
            </div>

            {/* Benefits */}
            <div className="form-group">
              <label>Benefits</label>
              {formData.benefits.map((benefit, index) => (
                <div key={index} className="benefit-row">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => updateBenefit(index, e.target.value)}
                    placeholder="Enter benefit"
                  />
                  <button
                    type="button"
                    onClick={() => removeBenefit(index)}
                    className="remove-btn"
                    disabled={formData.benefits.length === 1}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button type="button" onClick={addBenefit} className="add-btn">
                <Plus size={16} />
                Add Benefit
              </button>
            </div>
          </div>

          {/* Image Upload */}
          <div className="form-section full-width">
            <h2>Product Images</h2>
            
            <div className="image-upload-area">
              <input
                type="file"
                id="image-upload"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="image-upload" className="upload-label">
                <Upload size={24} />
                <span>Click to upload images</span>
                <small>PNG, JPG, GIF up to 10MB</small>
              </label>
            </div>

            {errors.images && <span className="error-message">{errors.images}</span>}

            {imagePreviews.length > 0 && (
              <div className="image-preview-grid">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="image-preview">
                    <img src={preview} alt={`Preview ${index + 1}`} />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="remove-image-btn"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {errors.submit && <div className="error-message submit">{errors.submit}</div>}

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="cancel-btn"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Uploading...
              </>
            ) : (
              <>
                <Save size={20} />
                Upload Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductUpload;
