package online.ordering.lookup;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="erp_partner_classes_lang")
public class erp_partner_class_lang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="PARTNER_CLASS_LANG_ID")
    private long id;

    private long PARTNER_CLASS_ID;

    private String LANGUAGE_CODE;

    private String DESCRIPTION;

    @Column(name="CREATED_BY")
    private long CreatedBy;

    @Column(name="CREATION_DATE")
    private Date CreationDate;

    @Column(name="LAST_UPDATE_BY")
    private long LastUpdatedBy;

    @Column(name="LAST_UPDATE_DATE")
    private Date LastUpdateDate;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getPARTNER_CLASS_ID() {
        return PARTNER_CLASS_ID;
    }

    public void setPARTNER_CLASS_ID(long PARTNER_CLASS_ID) {
        this.PARTNER_CLASS_ID = PARTNER_CLASS_ID;
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

