package online.ordering.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "sal_customers_lang")
public class sal_customer_lang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="LANG_ID")
    private long langId;

    @Column(name="CUSTOMER_ID")
    private long customerId;

    @Column(name="LANGUAGE_CODE")
    private String LANGUAGE_CODE;

    @Column(name="DESCRIPTION")
    private String DESCRIPTION;

    @Column(name="CREATED_BY")
    private long CreatedBy;

    @Column(name="CREATION_DATE")
    private Date CreationDate;

    @Column(name="LAST_UPDATE_BY")
    private long LastUpdatedBy;

    @Column(name="LAST_UPDATE_DATE")
    private Date LastUpdateDate;

    public long getLangId() {
        return langId;
    }

    public void setLangId(long langId) {
        this.langId = langId;
    }

    public long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(long customerId) {
        this.customerId = customerId;
    }

    public String getLANGUAGE_CODE() {
        return LANGUAGE_CODE;
    }

    public void setLANGUAGE_CODE(String LANGUAGE_CODE) {
        this.LANGUAGE_CODE = LANGUAGE_CODE;
    }

    public String getDESCRIPTION() {
        return DESCRIPTION;
    }

    public void setDESCRIPTION(String DESCRIPTION) {
        this.DESCRIPTION = DESCRIPTION;
    }

    public long getCreatedBy() {
        return CreatedBy;
    }

    public void setCreatedBy(long createdBy) {
        CreatedBy = createdBy;
    }

    public Date getCreationDate() {
        return CreationDate;
    }

    public void setCreationDate(Date creationDate) {
        CreationDate = creationDate;
    }

    public long getLastUpdatedBy() {
        return LastUpdatedBy;
    }

    public void setLastUpdatedBy(long lastUpdatedBy) {
        LastUpdatedBy = lastUpdatedBy;
    }

    public Date getLastUpdateDate() {
        return LastUpdateDate;
    }

    public void setLastUpdateDate(Date lastUpdateDate) {
        LastUpdateDate = lastUpdateDate;
    }
}
